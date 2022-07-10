import { Grid } from 'semantic-ui-react'

import Order from './Order'

const OrderList = ({ orders }) => {
  if (!orders?.length || orders.length === 0) return null
  return (
    <Grid>
      {orders?.map((order) => (
        <Grid.Column key={order.id} mobile={16} tablet={8} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default OrderList
