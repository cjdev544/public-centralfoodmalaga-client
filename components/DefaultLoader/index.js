import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const DefaultLoader = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader size='large'>Cargando...</Loader>
    </Dimmer>
  </Segment>
)

export default DefaultLoader
