
export class LocalPreferences {

  nameComponent: string;

  constructor(nameComponent: string) {
    this.nameComponent = nameComponent.toLowerCase();
  }

  getPreferencesValue(namePreference: string): string | null {
    return localStorage.getItem(`${this.nameComponent}.${namePreference.toLowerCase()}`);
  }

  setPreferencesValue(namePreference: string, valuePreference: string): void {
    localStorage.setItem(`${this.nameComponent}.${namePreference.toLowerCase()}`, valuePreference);
  }

}
