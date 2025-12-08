export default function LogoCard({ image, prompt, date }) {
  return (
    <div className="card flex items-center gap-4">
      <img
        src={image.startsWith('data:image') ? image : 'data:image/png;base64,' + image}
        className="w-20 h-20 rounded border border-white/10"
      />
      <div>
        <p className="opacity-80 text-sm">{prompt}</p>
        <p className="text-xs opacity-50">{date}</p>
      </div>
    </div>
  );
}
