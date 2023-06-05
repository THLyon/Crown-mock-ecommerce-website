import DirectoryItem from '../directory-item/directory-item.component';
import { DirectorContainer } from './directory.styles';

const Directory = ({categories}) => {
    return(
        <DirectorContainer>
        {categories.map((category) => (
        <DirectoryItem key={category.id} category={category}/> 
        ))}
        </DirectorContainer>
    )
};

export default Directory; 