import { Grid } from 'semantic-ui-react'

import PlateBox from '../PlateBox'

const SectionPlates = ({ products, category }) => {
  const productsInCategory = products?.filter(
    (product) => product.categoria === category
  )

  return (
    <Grid className='secction-plates'>
      {productsInCategory?.map((product) => {
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

export default SectionPlates
