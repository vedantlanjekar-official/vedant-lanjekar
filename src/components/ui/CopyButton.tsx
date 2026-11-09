import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import styles from './CopyButton.module.css';

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={styles.btn}
      data-done={done || undefined}
      onClick={async () => {
        if (await copyText(value)) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      aria-label={`Copy ${label}`}
    >
      {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span className="t-mono">{done ? 'Copied' : 'Copy'}</span>
      <span className="sr-only" aria-live="polite">
        {done ? `${label} copied to clipboard` : ''}
      </span>
    </button>
  );
}
