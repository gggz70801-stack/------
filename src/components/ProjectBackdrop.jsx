import './project-backdrop.css'

import codGear from '../assets/section-bg/tactical/cod-gear.webp'
import codTeam from '../assets/section-bg/tactical/cod-team.webp'
import codVisor from '../assets/section-bg/tactical/cod-visor.webp'
import codWarm from '../assets/section-bg/tactical/cod-warm.webp'
import cockpitNight from '../assets/section-bg/tactical/cockpit-night.webp'
import fieldOp from '../assets/section-bg/tactical/field-op.webp'
import hangar from '../assets/section-bg/tactical/hangar.webp'
import heliNight from '../assets/section-bg/tactical/heli-night.webp'
import helmetSoldier from '../assets/section-bg/tactical/helmet-soldier.webp'
import neonRain from '../assets/section-bg/tactical/neon-rain.webp'
import nightFlight from '../assets/section-bg/tactical/night-flight.webp'
import nightInsertion from '../assets/section-bg/tactical/night-insertion.webp'
import nightLaunch from '../assets/section-bg/tactical/night-launch.webp'
import nightPatrol from '../assets/section-bg/tactical/night-patrol.webp'
import nvgClose from '../assets/section-bg/tactical/nvg-close.webp'
import nvgSmoke from '../assets/section-bg/tactical/nvg-smoke.webp'
import redCabin from '../assets/section-bg/tactical/red-cabin.webp'

const BACKDROPS = {
  'cod-gear': { src: codGear, focus: '60% 34%' },
  'cod-team': { src: codTeam, focus: '66% 36%' },
  'cod-visor': { src: codVisor, focus: '58% 42%' },
  'cod-warm': { src: codWarm, focus: '68% 34%' },
  'cockpit-night': { src: cockpitNight, focus: '54% 48%' },
  'field-op': { src: fieldOp, focus: '62% 50%' },
  hangar: { src: hangar, focus: '58% 46%' },
  'heli-night': { src: heliNight, focus: '55% 50%' },
  'helmet-soldier': { src: helmetSoldier, focus: '66% 40%' },
  'neon-rain': { src: neonRain, focus: '60% 50%' },
  'night-flight': { src: nightFlight, focus: '64% 48%' },
  'night-insertion': { src: nightInsertion, focus: '58% 50%' },
  'night-launch': { src: nightLaunch, focus: '55% 50%' },
  'night-patrol': { src: nightPatrol, focus: '62% 26%' },
  'nvg-close': { src: nvgClose, focus: '54% 44%' },
  'nvg-smoke': { src: nvgSmoke, focus: '54% 50%' },
  'red-cabin': { src: redCabin, focus: '54% 40%' },
}

export default function ProjectBackdrop({
  variant = 'night-patrol',
  tone = 'amber',
  className = '',
}) {
  const backdrop = BACKDROPS[variant] || BACKDROPS['night-patrol']

  return (
    <div
      className={`pbackdrop pbackdrop--${tone} ${className}`}
      style={{ '--pb-focus': backdrop.focus }}
      aria-hidden="true"
    >
      <img
        className="pbackdrop__photo"
        src={backdrop.src}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width="1920"
        height="1080"
      />
      <span className="pbackdrop__glow" />
      <span className="pbackdrop__wash" />
      <span className="pbackdrop__grid" />
      <span className="pbackdrop__scan" />
      <span className="pbackdrop__edge" />
    </div>
  )
}
