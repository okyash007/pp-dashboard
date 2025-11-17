import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TnCContent() {
  return (
    <div className='space-y-5'>
      {/* Terms Content */}
      <Card className='border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200'>
        <CardHeader className='bg-gradient-to-r from-[#828BF8]/30 via-[#828BF8]/20 to-[#828BF8]/10 border-b-[3px] border-black p-4'>
          <CardTitle className='text-lg font-black text-black uppercase tracking-wide flex items-center gap-2'>
            <Shield className='w-5 h-5 text-[#828BF8]' />
            <span>Terms of Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <div className='space-y-5 text-sm text-black/80 leading-relaxed'>
            <div className='p-4 bg-gradient-to-r from-[#FEF18C]/20 to-transparent border-[2px] border-black/20 rounded-sm'>
              <p className='font-semibold text-black/90'>
                For the complete and most up-to-date Terms & Conditions, please visit our official website.
              </p>
            </div>
            <p className='font-medium leading-relaxed'>
              Potatopay provides a platform for creators to receive financial support from their fans. By using our service, you agree to comply with all applicable laws and regulations, including Indian Law.
            </p>
            <div className='space-y-4 mt-6 p-4 bg-gradient-to-br from-[#828BF8]/10 to-[#FEF18C]/10 border-[2px] border-black/20 rounded-sm'>
              <h3 className='font-black text-black uppercase text-base flex items-center gap-2'>
                <div className='w-2 h-2 bg-[#FEF18C] border-[2px] border-black rounded-full'></div>
                Key Points:
              </h3>
              <ul className='space-y-2.5 ml-6 list-disc'>
                <li className='font-medium'>All activities must comply with Indian Law</li>
                <li className='font-medium'>Minimum support fund: ₹1</li>
                <li className='font-medium'>Minimum disbursement amount: ₹10</li>
                <li className='font-medium'>Service fees may apply - see detailed terms for fee structure</li>
                <li className='font-medium'>Refunds are only available if the supporter raises a ticket</li>
                <li className='font-medium'>2FA can be managed through Profile-Security settings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Link Card */}
      <Card className='border-[3px] border-black bg-gradient-to-br from-[#FEF18C]/25 via-[#FEF18C]/15 to-[#FEF18C]/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200'>
        <CardContent className='p-6'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-black border-[3px] border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
              <ExternalLink className='w-6 h-6 text-[#FEF18C]' />
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-black text-black uppercase mb-2 tracking-tight'>Full Terms & Conditions</h3>
              <p className='text-sm text-black/70 font-semibold mb-5 leading-relaxed'>
                For the complete legal document, including all terms, conditions, fees, and policies, please visit our official website.
              </p>
              <Button
                asChild
                className='bg-black hover:bg-[#828BF8] text-white font-black text-sm px-5 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
              >
                <a href='https://potatopay.co/terms' target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
                  <span>View Full Terms & Conditions</span>
                  <ExternalLink className='w-4 h-4' />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className='border-[3px] border-black bg-gradient-to-br from-[#828BF8]/15 via-[#FEF18C]/20 to-[#828BF8]/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-200'>
        <CardContent className='p-6'>
          <div className='flex items-start gap-4'>
            <div className='w-12 h-12 bg-black border-[3px] border-black flex items-center justify-center flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
              <FileText className='w-6 h-6 text-[#FEF18C]' />
            </div>
            <div className='flex-1'>
              <h3 className='text-xl font-black text-black uppercase mb-2 tracking-tight'>Questions about our Terms?</h3>
              <p className='text-sm text-black/70 font-semibold mb-5 leading-relaxed'>
                If you have any questions about our Terms & Conditions, please contact us:
              </p>
              <div className='flex flex-wrap gap-3'>
                <Button
                  asChild
                  className='bg-white hover:bg-[#FEF18C] text-black font-black text-sm px-5 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
                >
                  <a href='mailto:help@potatopay.co'>help@potatopay.co</a>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  className='bg-white hover:bg-[#828BF8] hover:text-white text-black font-black text-sm px-5 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
                >
                  <Link to='/dashboard/faq'>View FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

