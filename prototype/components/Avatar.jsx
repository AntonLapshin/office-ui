// Avatar.jsx — gradient initials circle, optional image, hover-triggered card
const { useState, useRef, useEffect } = React;

function Avatar({ character, size = 40, ringed = false, onHoverChange }) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (onHoverChange) onHoverChange(hover ? ref.current : null);
  }, [hover]);

  if (!character) return null;
  const [c1, c2] = character.gradient || ["#6366f1", "#a855f7"];
  const fontSize = Math.max(10, Math.round(size * 0.38));

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-flex items-center justify-center rounded-full select-none cursor-pointer transition-transform duration-200 hover:scale-110"
      style={{
        width: size,
        height: size,
        background: character.image ? "#0b0b14" : `linear-gradient(135deg, ${c1}, ${c2})`,
        boxShadow: ringed
          ? `0 0 0 2px rgba(15,15,25,0.9), 0 0 0 3.5px ${c2}, 0 8px 24px -6px ${c2}66`
          : `0 6px 18px -6px ${c2}88, inset 0 1px 0 rgba(255,255,255,0.18)`
      }}
    >
      {character.image ? (
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span
          className="font-semibold text-white tracking-tight"
          style={{ fontSize, textShadow: "0 1px 2px rgba(0,0,0,0.35)" }}
        >
          {character.initials}
        </span>
      )}
    </div>
  );
}

window.Avatar = Avatar;
