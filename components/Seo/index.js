import Head from 'next/head'

const Seo = (props) => {
  const { title, description } = props

  return (
    <Head>
      <title>{title} | Central Food</title>
      <meta name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

export default Seo

Seo.defaultProps = {
  title: 'CentralFood Málaga',
  description:
    'Encuantra variedad de comidas de diferentes nacionalidades, todo en un mismo lugar. Porque en la variedad esta el gusto',
}
