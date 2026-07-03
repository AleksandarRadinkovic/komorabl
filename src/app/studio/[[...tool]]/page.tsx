// Sanity Studio nije dostupan u ovom buildu zbog kompatibilnosti React 18/19.
// Koristi: https://www.sanity.io/manage (hosted studio)
// ili lokalno: npx sanity dev (pokreće studio na :3333)
export default function StudioPage() {
  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Sanity Studio</h1>
      <p>
        Studio je dostupan na{' '}
        <a href="https://www.sanity.io/manage" target="_blank" rel="noreferrer">
          sanity.io/manage
        </a>
        {' '}ili lokalno pokretanjem <code>npx sanity dev</code>.
      </p>
    </div>
  );
}
