// Write your code here
import './index.css'

const LanguageFilter = props => {
  const {languageDetails, isActive, updateLanguage} = props
  const {id, language} = languageDetails

  const languageBackground = isActive ? 'lang_btn isActive' : 'lang_btn'

  const onClickLanguage = () => {
    updateLanguage(id)
  }

  return (
    <li className="language_item">
      <button
        type="button"
        className={languageBackground}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilter
