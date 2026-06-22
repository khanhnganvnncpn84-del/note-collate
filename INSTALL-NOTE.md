# Install Note

## Quick Install

Copy `note-collate/` into Codex's skills directory:

```bash
# macOS / Linux
cp -R note-collate ~/.codex/skills/

# Windows PowerShell
Copy-Item -Recurse note-collate "$env:USERPROFILE\.codex\skills\"
```

## Verify Installation

Open Codex and type:

> "$note-collate 帮我整理这份笔记"

If the skill is installed correctly, Codex will respond with the NoteCollate workflow.

## Requirements

- Codex Desktop or Codex CLI (any version)
- No additional dependencies or API keys required

## Manual Install

If `~/.codex/skills/` doesn't exist, create it first:

```bash
mkdir -p ~/.codex/skills
```

Then copy the folder as above.

## Uninstall

Simply delete the note-collate folder:

```bash
rm -rf ~/.codex/skills/note-collate
```
