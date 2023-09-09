import { Person } from "./types";

export function displayName(person: Person) {
    return `${person.firstName} ${person.lastName}`
}