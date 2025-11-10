'use client';
import Link from 'next/link';
import { useI18n } from '@/components/Translation/TranslationProvider';

type MenuItem = {
  icon: string;
  key: string;
  href?: string;
};

type Props = {
  heroImage?: string;
  titleKey: string;
  descKey: string;
  items?: MenuItem[];        // 👈 make optional
  onClose: () => void;
  extraContent?: React.ReactNode;
};

export default function MegaMenuSection({
  heroImage,
  titleKey,
  descKey,
  items = [],                 // 👈 safe default
  onClose,
  extraContent,
}: Props) {
  const { t } = useI18n();

  return (
    <div className='rounded-[24px] bg-white overflow-hidden max-w-[600px]'>
      {heroImage && (
        <div className='flex gap-6 p-6 items-center'>
          <div className='relative w-[131px] h-[131px] shrink-0'>
            <img
              src={heroImage}
              alt=''
              className='w-full h-full object-cover rounded-[12px]'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-[#475569] text-[16px] font-medium leading-[22px]'>
              {t(titleKey)}
            </div>
            <div className='text-[#64748B] text-[12px] leading-5'>
              {t(descKey)}
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <ul className='flex flex-col gap-4 px-6 py-6 border-y border-[#F1F5F9] bg-white'>
          {items.map((r) => {
            const disabled = !r.href;
            return (
              <li
                key={r.key}
                className={`flex items-center gap-2 w-full ${
                  disabled
                    ? 'opacity-40 cursor-default'
                    : 'cursor-pointer hover:bg-[#EFF6FF] rounded-[12px] -mx-4 px-4 py-2'
                }`}
              >
                {r.href ? (
                  <Link
                    href={r.href}
                    className='flex items-center gap-2 w-full'
                    onClick={onClose}
                  >
                    <img src={r.icon} alt='' className='w-[22px] h-[22px]' />
                    <span className='text-[#475569] text-[14px] leading-[22px]'>
                      {t(r.key)}
                    </span>
                  </Link>
                ) : (
                  <>
                    <img src={r.icon} alt='' className='w-[22px] h-[22px]' />
                    <span className='text-[#475569] text-[14px] leading-[22px]'>
                      {t(r.key)}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {extraContent && <div className='bg-white'>{extraContent}</div>}
    </div>
  );
}
