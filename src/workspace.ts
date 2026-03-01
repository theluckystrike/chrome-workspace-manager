/**
 * Workspace Manager — Save and restore named tab workspaces
 */
export interface Workspace { name: string; tabs: Array<{ url: string; pinned: boolean }>; createdAt: number; }

export class WorkspaceManager {
    private storageKey = '__workspaces__';

    /** Save current window as workspace */
    async save(name: string): Promise<Workspace> {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const workspace: Workspace = {
            name, createdAt: Date.now(),
            tabs: tabs.filter((t) => t.url && !t.url.startsWith('chrome://')).map((t) => ({ url: t.url!, pinned: t.pinned || false }))
        };
        const all = await this.list();
        const idx = all.findIndex((w) => w.name === name);
        if (idx >= 0) all[idx] = workspace; else all.push(workspace);
        await chrome.storage.local.set({ [this.storageKey]: all });
        return workspace;
    }

    /** Restore a workspace */
    async restore(name: string, newWindow: boolean = true): Promise<void> {
        const all = await this.list();
        const ws = all.find((w) => w.name === name);
        if (!ws) throw new Error(`Workspace "${name}" not found`);
        if (newWindow) {
            const win = await chrome.windows.create({ url: ws.tabs[0]?.url });
            for (let i = 1; i < ws.tabs.length; i++) {
                await chrome.tabs.create({ windowId: win.id, url: ws.tabs[i].url, pinned: ws.tabs[i].pinned });
            }
        } else {
            for (const tab of ws.tabs) await chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
        }
    }

    /** List all workspaces */
    async list(): Promise<Workspace[]> {
        const result = await chrome.storage.local.get(this.storageKey);
        return (result[this.storageKey] as Workspace[]) || [];
    }

    /** Delete a workspace */
    async delete(name: string): Promise<boolean> {
        const all = await this.list();
        const filtered = all.filter((w) => w.name !== name);
        if (filtered.length === all.length) return false;
        await chrome.storage.local.set({ [this.storageKey]: filtered });
        return true;
    }

    /** Rename a workspace */
    async rename(oldName: string, newName: string): Promise<boolean> {
        const all = await this.list();
        const ws = all.find((w) => w.name === oldName);
        if (!ws) return false;
        ws.name = newName;
        await chrome.storage.local.set({ [this.storageKey]: all });
        return true;
    }

    /** Export workspace as JSON */
    async exportWorkspace(name: string): Promise<string> {
        const all = await this.list();
        const ws = all.find((w) => w.name === name);
        if (!ws) throw new Error(`Workspace "${name}" not found`);
        return JSON.stringify(ws, null, 2);
    }

    /** Import workspace from JSON */
    async importWorkspace(json: string): Promise<Workspace> {
        const ws = JSON.parse(json) as Workspace;
        const all = await this.list();
        all.push(ws);
        await chrome.storage.local.set({ [this.storageKey]: all });
        return ws;
    }
}
