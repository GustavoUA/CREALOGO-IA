interface LogoCardProps {
  image: string;
  prompt: string;
  date: string;
}

export default function LogoCard({ image, prompt, date }: LogoCardProps) {
  return (
    <div className="card flex items-center gap-4">
      <img
        src={image.startsWith("data:image") ? image : `data:image/png;base64,${image}`}
        alt="logo generado"
        className="w-20 h-20 rounded border border-white/10"
      />

      <div>
        <p className="opacity-80 text-sm">{prompt}</p>
        <p className="text-xs opacity-50">{date}</p>
      </div>
    </div>
  );
}
