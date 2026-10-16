export default function Marquee({ items, reverse = false }) {
  const group = (
    <div className="marquee__group" aria-hidden="true">
      {items.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  )
}
