export function LoadingPage(): JSX.Element {
  const loadingStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '1.5em',
  };

  return (
    <div style={loadingStyles}>
      <h1>Загрузка...</h1>
    </div>
  );
}
