import { QualitySpecs as QualitySpecsType } from '@/types/product-types';

interface QualitySpecsProps {
  specs: QualitySpecsType;
  frameIncluded: boolean;
}

export function QualitySpecs({ specs, frameIncluded }: QualitySpecsProps) {
  return (
    <div className='mt-6 space-y-4'>
      {/* Paper Quality */}
      <div className='flex items-start gap-4 p-4 bg-cream-base border border-sage-green/20 rounded-lg'>
        <div className='w-12 h-12 bg-sage-green/10 rounded-full flex items-center justify-center flex-shrink-0'>
          <svg className='w-6 h-6 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
          </svg>
        </div>
        <div>
          <h4 className='font-medium text-deep-charcoal mb-1'>{specs.paperWeight} premium paper</h4>
          <p className='text-sm text-warm-gray'>{specs.finish}</p>
        </div>
      </div>

      {/* Frame Quality */}
      <div className='flex items-start gap-4 p-4 bg-cream-base border border-sage-green/20 rounded-lg'>
        <div className='w-12 h-12 bg-sage-green/10 rounded-full flex items-center justify-center flex-shrink-0'>
          <svg className='w-6 h-6 text-sage-green' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' />
          </svg>
        </div>
        <div>
          <h4 className='font-medium text-deep-charcoal mb-1'>
            {frameIncluded ? 'Premium frame included' : 'Frames of the highest quality'}
          </h4>
          <p className='text-sm text-warm-gray'>
            {frameIncluded 
              ? 'Ready to hang with museum-quality framing'
              : 'Available with crystal clear acrylic glass'
            }
          </p>
        </div>
      </div>

      {/* Frame Not Included Notice */}
      {!frameIncluded && (
        <div className='p-3 bg-warm-gray/5 border border-warm-gray/20 rounded-lg'>
          <p className='text-sm text-warm-gray'>
            <strong>Frame not included.</strong> Print comes with a white margin ready for standard framing.
          </p>
        </div>
      )}

      {/* Additional Information */}
      <div className='pt-4 border-t border-sage-green/10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='text-warm-gray'>Paper type:</span>
            <span className='ml-2 text-deep-charcoal font-medium'>{specs.paperType}</span>
          </div>
          <div>
            <span className='text-warm-gray'>Finish:</span>
            <span className='ml-2 text-deep-charcoal font-medium'>{specs.finish}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
