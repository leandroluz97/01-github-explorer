import RepositoryItem from "./RepositoryItem"
import "../styles/repositories.scss"
import { useEffect, useState } from "react"

//https://api.github.com/orgs/Rocketseat/repos

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    fetch("https://api.github.com/orgs/Rocketseat/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data))
  }, [])
  console.log(repositories)
  return (
    <section className='repository-list'>
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map((repository) => {
          return <RepositoryItem key={repository.id} repository={repository} />
        })}
      </ul>
    </section>
  )
}

export default RepositoryList
