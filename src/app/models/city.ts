
export interface Comune {
  nome: string
  codice: string
  zona: Zona
  regione: Regione
  provincia: Provincia
  sigla: string
  codiceCatastale: string
  cap: string[]
  popolazione: number
}

export interface Zona {
  nome: string
  codice: string
}

export interface Regione {
  codice: string
  nome: string
}

export interface Provincia {
  codice: string
  nome: string
}
