import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import LanguageFilter from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure_image"
        alt="failure view"
      />
      <p className="failure_msg">Something Went Wrong</p>
    </div>
  )

  renderSuccessView = () => {
    const {repositoryList} = this.state

    return (
      <ul className="repository_list_container">
        {repositoryList.map(eachRepo => (
          <RepositoryItem repositoryDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  updateLanguage = id => {
    this.setState({activeLanguageId: id}, this.getRepositoryList)
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLanguages = () => {
    const {activeLanguageId} = this.state

    return languageFiltersData.map(eachLanguage => (
      <LanguageFilter
        languageDetails={eachLanguage}
        updateLanguage={this.updateLanguage}
        isActive={activeLanguageId === eachLanguage.id}
        key={eachLanguage.id}
      />
    ))
  }

  render() {
    return (
      <div className="popular_repo_page_bg">
        <h1 className="popular_title">Popular</h1>
        <ul className="languages_container">{this.renderLanguages()}</ul>
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default GithubPopularRepos
