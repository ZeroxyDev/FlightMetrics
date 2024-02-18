import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
      import Image from 'next/image';
      import { QRCode } from 'react-qrcode-logo';
      import logo from '../../../../../public/logo.png';


      
      type Props = {
        link: [] | any
      }
      
      const QRGen: FunctionComponent<Props> = ({ link  }) => {

        return(
            <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap relative justify-center">

                      <QRCode eyeRadius={[{ // top/left eye
                        outer: [50, 50, 0, 50],
                        inner: [50, 50, 0, 50],},
                        [50, 50, 50, 0], // top/right eye
                        [50, 0, 50, 50], // bottom/left
                      ]} id='qr-post'
                       qrStyle='dots' 
                       logoPaddingStyle='circle' 
                       value={link} 
                       size={200} 
                       bgColor={'#101010'} 
                       fgColor='white' 
                       logoImage={logo.src} 
                       logoWidth={55} 
                       removeQrCodeBehindLogo={true} 
                       logoPadding={-5} />
        </div> )
      }

export default QRGen;  