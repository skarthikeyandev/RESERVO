import { useState } from 'react'

export function useForm(initial) {
  const [values, setValues] = useState(initial)

  function handleChange(e) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function reset() { setValues(initial) }

  return { values, handleChange, reset, setValues }
}
