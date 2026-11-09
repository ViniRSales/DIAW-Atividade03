import { MAX_STAT } from '../utils/pokemonHelpers'
import '../css/StatBar.css'

// Cor da barra conforme o valor do atributo (vermelho -> verde).
function getBarColor(value) {
  if (value < 50) return '#f03e3e'
  if (value < 70) return '#f76707'
  if (value < 90) return '#f59f00'
  if (value < 110) return '#74b816'
  return '#2f9e44'
}

// Barra de progresso que representa um atributo do Pokémon.
function StatBar({ label, value }) {
  const percent = Math.min((value / MAX_STAT) * 100, 100)

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div className="stat-bar__track">
        <div
          className="stat-bar__fill"
          style={{ width: `${percent}%`, backgroundColor: getBarColor(value) }}
        />
      </div>
    </div>
  )
}

export default StatBar
