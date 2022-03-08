// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository_item_container">
      <div className="image_container">
        <img src={avatarUrl} className="repository_image" alt={name} />
        <h1 className="repository_image_title">{name}</h1>
      </div>
      <div className="details_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="details_image"
          alt="stars"
        />
        <p className="details_img_description">{starsCount} stars</p>
      </div>
      <div className="details_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="details_image"
          alt="forks"
        />
        <p className="details_img_description">{forksCount} forks</p>
      </div>
      <div className="details_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="details_image"
          alt="open issues"
        />
        <p className="details_img_description">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
