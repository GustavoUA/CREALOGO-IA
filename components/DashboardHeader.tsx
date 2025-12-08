export default function DashboardHeader({ credits }: { credits: number }) {
  return (
    <div className="card mb-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Panel de usuario</h2>
      <p className="opacity-80">Créditos disponibles: {credits}</p>
    </div>
  );
}
