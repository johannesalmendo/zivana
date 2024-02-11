import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react'

interface ShoppingConditionsProps {

}

const ShoppingConditions: FC<ShoppingConditionsProps> = ({ }) => {
  return (
    <div className='container mx-auto px-4'>

      <div className='text-xl text-bold ml-10 mt-10'>How to order</div>
      <div className="container mx-auto px-4">
        <Card className='m-10 max-w-50'>
          <CardHeader>
            <CardTitle>Step 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Silahkan mencari produk yang ada inginkan di halaman produk
            </div>
            <img src="/step1.png" className='' />
          </CardContent>

        </Card>

        <Card className='m-10 max-w-50'>
          <CardHeader>
            <CardTitle>Step 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Setelah menemukan produk yang anda ingin beli
              maka silhakan anda klik pesan sekarang
            </div>

            <img src="/step2.png" className='' />
          </CardContent>
        </Card>

        <Card className='m-10 max-w-50'>
          <CardHeader>
            <CardTitle>Step 3</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Setelah anda tadi mengklik pesan sekarang, selanjutnya anda akan di arahkan ke whatsapp
              untuk melanjutkan pesanan anda dengan admin Zivana.
            </div>
            <img src="/step3.png" className='' />
          </CardContent>

        </Card>

        <Card className='m-10 max-w-50'>
          <CardHeader>
            <CardTitle>Step 4</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Selesai.
            </div>
          </CardContent>
        </Card>
      </div>

     
      


    </div>
  )
}

export default ShoppingConditions;
