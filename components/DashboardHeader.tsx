export default function DashboardHeader({ credits }) {
  return (
    <div className="card mb-6 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Panel de usuario</h2>
      <p className="text-primary font-bold text-lg">{credits} créditos</p>
    </div>
  );
}
