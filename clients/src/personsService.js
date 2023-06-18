import axios from 'axios'

class PersonsService {

    async getPersonsAsync() {
        // Returns JSON array containing persons.
        return axios
            .get("http://localhost:3002/persons")
            .then((response) => response.data)
    }

    async createPersonAsync(person) {
        // Creates new person from function argument by calling POST API.
        axios.post("http://localhost:3002/persons", person)
    }

    async deletePersonByIdAsync(personId) {
        axios.delete(`http://localhost:3002/persons/${personId}`)
    }

    async updatePersonAsync(updatedPerson) {
        const updatedPersonData = {
            name: updatedPerson.name,
            number: updatedPerson.number
        }
        axios.put(`http://localhost:3002/persons/${updatedPerson.id}`, updatedPersonData)
    }
}

export default PersonsService