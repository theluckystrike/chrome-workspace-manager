# Chrome Workspace Manager

A TypeScript library for Chrome extensions that provides workspace management capabilities. Save, restore, switch, import, and export named tab workspaces for Manifest V3 extensions.

## Installation

```bash
npm install chrome-workspace-manager
```

## API Reference

The WorkspaceManager class provides the following methods.

### save

Saves the current window tabs as a named workspace.

```typescript
const workspace = await workspaceManager.save('my-workspace');
```

Returns the saved Workspace object.

### restore

Restores a previously saved workspace.

```typescript
// Restore in a new window (default)
await workspaceManager.restore('my-workspace');

// Restore in current window
await workspaceManager.restore('my-workspace', false);
```

### list

Returns all saved workspaces.

```typescript
const workspaces = await workspaceManager.list();
```

### delete

Deletes a workspace by name. Returns true if the workspace was deleted.

```typescript
const deleted = await workspaceManager.delete('my-workspace');
```

### rename

Renames an existing workspace. Returns true if the rename was successful.

```typescript
const renamed = await workspaceManager.rename('old-name', 'new-name');
```

### exportWorkspace

Exports a workspace as a JSON string for backup or sharing.

```typescript
const json = await workspaceManager.exportWorkspace('my-workspace');
console.log(json); // {"name":"my-workspace","tabs":[...],"createdAt":1234567890}
```

### importWorkspace

Imports a workspace from a JSON string.

```typescript
const workspace = await workspaceManager.importWorkspace(jsonString);
```

## Workspace Type

```typescript
interface Workspace {
    name: string;
    tabs: Array<{ url: string; pinned: boolean }>;
    createdAt: number;
}
```

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/theluckystrike/chrome-workspace-manager.git
cd chrome-workspace-manager
npm install
```

Build the TypeScript:

```bash
npm run build
```

## About

Chrome Workspace Manager is maintained by theluckystrike. It is distributed under the MIT License.

For issues and contributions, please visit the GitHub repository.

Visit zovo.one for more information about the project and related tools.
