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
  items: MenuItem[];
  onClose: () => void;
  extraContent?: React.ReactNode; // optional (like the Map strip)
};

export default function MegaMenuSection({
  heroImage,
  titleKey,
  descKey,
  items,
  onClose,
  extraContent
}: Props) {
  const { t } = useI18n();

	return (
		<div className='mega-right-body'>
			{heroImage && (
				<div className='mega-hero'>
					<div className='mega-hero-img-wrapper'>
						<img className='mega-hero-img' src={heroImage} alt='' />
					</div>
					<div className='mega-hero-text'>
						<div className='mega-hero-title'>{t(titleKey)}</div>
						<div className='mega-hero-desc'>{t(descKey)}</div>
					</div>
				</div>
			)}

			<ul className='mega-right-list'>
				{items.map((r) => (
					<li key={r.key} className={`mega-right-item ${r.href ? '' : 'disabled'}`}>
						{r.href ? (
							<Link
								href={r.href}
								className='mega-right-item-link'
								onClick={onClose}
							>
								<img className='mega-right-icon' src={r.icon} alt='' />
								<span>{t(r.key)}</span>
							</Link>
						) : (
							<>
								<img className='mega-right-icon' src={r.icon} alt='' />
								<span>{t(r.key)}</span>
							</>
						)}
					</li>
				))}
			</ul>

			{extraContent && <div className='mega-extra'>{extraContent}</div>}
		</div>
	);
}
