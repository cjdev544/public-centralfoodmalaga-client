import { Grid } from 'semantic-ui-react'

import PlateBox from '../PlateBox'

const FindProducts = ({ products }) => {
  return (
    <Grid className='secction-plates'>
      {products?.map((product) => {
        if (!product || !product?.disponible) return null

        return (
          <Grid.Column key={product.id} mobile={16} tablet={8} computer={4}>
            <PlateBox product={product} />
          </Grid.Column>
        )
      })}
    </Grid>
  )
}

export default FindProducts
