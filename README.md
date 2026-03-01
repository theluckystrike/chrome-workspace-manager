# chrome-workspace-manager — Named Tab Workspaces
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-workspace-manager`

Save, restore, rename, delete, export/import named tab workspaces with persistence.

```typescript
import { WorkspaceManager } from 'chrome-workspace-manager';
const wm = new WorkspaceManager();
await wm.save('Research');
await wm.restore('Research', true); // opens in new window
const json = await wm.exportWorkspace('Research');
```
MIT License
