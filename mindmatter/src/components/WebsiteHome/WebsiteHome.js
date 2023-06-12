import abcd from './homeimage.jpeg'
// C:\Pro\CDAC_project\CDAC project\FirstReact\mindmatter\src\components\images\homeimage.jpeg


export default function WebsiteHome()
{
    return(
        <div>

        <h1 className='heading'>Welcome to MindMatter</h1>

        <img src={abcd} class="center"></img>

        </div>

        
    )
}