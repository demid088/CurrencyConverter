import ContentLoader from 'react-content-loader'

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={124}
    viewBox='0 0 320 124'
    backgroundColor='#210062'
    foregroundColor='#f9e2af'
    {...props}
  >
    <circle cx='45' cy='77' r='20' />
    <circle cx='105' cy='77' r='20' />
    <circle cx='166' cy='77' r='20' />
    <circle cx='226' cy='77' r='20' />
    <circle cx='286' cy='77' r='20' />
  </ContentLoader>
)

export default Loader


