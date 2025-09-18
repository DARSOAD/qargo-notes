import { useRef } from "react";
import { Stack, Group } from "@mantine/core";
import { useNotes } from "../../features/notes/hooks/useNotes";
import { TextField } from "../../shared/ui/TextField";
import { Button } from "../../shared/ui/Button";
import { Card } from "../../shared/ui/Card";

export default function NotesPage() {
    const { notes, loading, creating, deletingId, errorText, addNote, removeNote } = useNotes();

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const title = titleRef.current?.value?.trim() ?? "";
        const content = contentRef.current?.value?.trim() ?? "";
        if (!title || !content) return;
        await addNote({ title, content });
        if (titleRef.current) titleRef.current.value = "";
        if (contentRef.current) contentRef.current.value = "";
        titleRef.current?.focus();
    };

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
            <Stack gap="lg">

                {/* Form create */}
                <Card className="p-4">
                    <form onSubmit={handleAdd} noValidate>
                        <Stack gap="sm">
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                placeholder="My brilliant idea"
                                ref={titleRef}
                                required
                                aria-required="true"
                            />
                            <div>
                                <label htmlFor="content" style={{ display: "block", marginBottom: 6 }}>
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    placeholder="Write your note here..."
                                    ref={contentRef}
                                    rows={4}
                                    style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                                    required
                                    aria-required="true"
                                />
                            </div>

                            {errorText ? (
                                <div role="alert" className="text-red-600 text-sm">{errorText}</div>
                            ) : null}

                            <Button type="submit" disabled={creating}>
                                {creating ? "Adding..." : "Add note"}
                            </Button>
                        </Stack>
                    </form>
                </Card>

                {/* List / Empty */}
                <Stack gap="md">
                    {loading ? (
                        <div>Loading notes…</div>
                    ) : notes.length === 0 ? (
                        <Card className="p-6">
                            <div style={{ fontSize: 16, marginBottom: 8 }}>No notes yet</div>
                            <div style={{ opacity: 0.8 }}>
                                You don't have any notes. Create your first one using the form above.
                            </div>
                        </Card>
                    ) : (
                        notes.map((n) => (
                            <Card key={n.id} className="p-4">
                                <Stack gap="xs">
                                    <div style={{ fontWeight: 600 }}>{n.title}</div>
                                    <div style={{ whiteSpace: "pre-wrap" }}>{n.content}</div>
                                    <Group justify="end">
                                        <Button
                                            variant="ghost"
                                            onClick={() => void removeNote(n.id)}
                                            disabled={deletingId === n.id}
                                        >
                                            {deletingId === n.id ? "Deleting..." : "Delete"}
                                        </Button>
                                    </Group>
                                </Stack>
                            </Card>
                        ))
                    )}
                </Stack>
            </Stack>
        </div>
    );
}
