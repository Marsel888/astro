'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

/**
 * Remove a reader from the admin table.
 *
 * The same erasure the reader can trigger themselves — account, saved charts,
 * every daily reading — so it asks for the address to be typed back. A row in a
 * table is easy to click by accident, and there is nothing to undo afterwards.
 */
export default function DeleteUserButton({ userId, email }: { userId: string; email: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    const typed = window.prompt(
      `Видалити ${email} разом з усіма картами й читаннями?\n\nВведіть адресу, щоб підтвердити:`,
    );
    if (typed?.trim().toLowerCase() !== email.toLowerCase()) return;

    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(String(res.status));
      router.refresh();
    } catch {
      setError('не вдалось');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="font-mono text-caption text-ink-muted hover:text-asp-hard disabled:opacity-50"
    >
      {error ?? (busy ? '…' : 'видалити')}
    </button>
  );
}
