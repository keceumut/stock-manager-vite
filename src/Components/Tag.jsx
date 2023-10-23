import {Link} from 'react-router-dom'

const Tag = ({tag, type, search}) => {
    if(tag == null) return null

    const classNames = ['bg-secondary', 'bg-accent', 'bg-contrast'];
    function getRandomArrayItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    const randomClass = getRandomArrayItem(classNames);

    let bgColor = ''
    switch (type) {
        case 'primary':
          bgColor = 'bg-primary-700'
          break;
    
        case 'secondary':
          bgColor = 'bg-secondary'
          break;
    
        case 'accent':
          bgColor = 'bg-accent'
          break;
    
        case 'contrast':
          bgColor = 'bg-contrast'
          break;

        case 'random':
            bgColor = randomClass
          break;
    }
    return(
      <Link to=""><div className={`${bgColor} rounded-full pointer-events-none text-white text-sm max-w-min px-3 py-1`}>{tag}</div></Link>
    )
        
    
}

export default Tag