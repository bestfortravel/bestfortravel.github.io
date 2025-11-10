'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/components/Translation/TranslationProvider';
import MegaMenuSection from './MegaMenuSection';

type Props = {
  open: boolean;
  onClose: () => void;
};

type FirstLevel = {
  key: string;
  icon: string;
  isDivider: boolean;
};

const FIRST_LEVEL: FirstLevel[] = [
  { key: 'explore', icon: '/menu/explore.svg', isDivider: false },
  { key: 'map', icon: '/menu/map.svg', isDivider: false },
  { key: 'trips', icon: '/menu/trips.svg', isDivider: false },
  { key: 'albums', icon: '/menu/book.svg', isDivider: true },
  { key: 'friends', icon: '/menu/friends.svg', isDivider: false },
  { key: 'insights', icon: '/menu/insights.svg', isDivider: false },
  { key: 'groups', icon: '/menu/groups.svg', isDivider: false },
  { key: 'community', icon: '/menu/users-group.svg', isDivider: true },
  { key: 'settings', icon: '/menu/settings.svg', isDivider: false },
  { key: 'help', icon: '/menu/help.svg', isDivider: false },
];

const EXPLORE_RIGHT = [
  { icon: '/menu/weddings.svg', key: 'explore.weddings', href: '' },
  { icon: '/menu/kids.svg', key: 'explore.kids', href: '' },
  { icon: '/menu/news.svg', key: 'explore.news', href: '/feed' },
  { icon: '/menu/posts.svg', key: 'explore.posts', href: '/feed' },
  { icon: '/menu/animals.svg', key: 'explore.animals', href: '' },
  { icon: '/menu/reels.svg', key: 'explore.reels', href: '/profile' },
  { icon: '/menu/compare.svg', key: 'explore.compare', href: '' },
  { icon: '/menu/challenges.svg', key: 'explore.challenges', href: '' },
  { icon: '/menu/destinations.svg', key: 'explore.dreams', href: '' },
];

const MAP_RIGHT = [
  { icon: '/menu/search-user.svg', key: 'map.people', href: '/map?tab=people' },
  { icon: '/menu/places.svg', key: 'map.places', href: '/map?tab=places' },
  { icon: '/menu/stays.svg', key: 'map.stays', href: '/map?tab=stays' },
  { icon: '/menu/activities.svg', key: 'map.activities', href: '/map?tab=activities' },
  { icon: '/menu/food.svg', key: 'map.food', href: '/map?tab=food' },
  { icon: '/menu/movies.svg', key: 'map.movies', href: '/map?tab=movies' },
  { icon: '/menu/tips.svg', key: 'map.tips', href: '/map?tab=tips' },
];

const TRIPS_RIGHT = [
  { icon: '/menu/plus.svg', key: 'trips.create' },
  { icon: '/menu/pin.svg', key: 'trips.mine' },
  { icon: '/menu/location-user.svg', key: 'trips.shared' },
  { icon: '/menu/location-check.svg', key: 'trips.suggested' },
  { icon: '/menu/sparkles.svg', key: 'trips.recommender' },
];

const ALBUMS_RIGHT = [
  { icon: '/menu/plus.svg', key: 'albums.create' },
  { icon: '/menu/book.svg', key: 'albums.mine' },
  { icon: '/menu/book-user.svg', key: 'albums.friends' },
  { icon: '/menu/book-share.svg', key: 'albums.shared' },
  { icon: '/menu/archive.svg', key: 'albums.archived' },
];

const FRIENDS_RIGHT = [
  { icon: '/menu/table.svg', key: 'friends.compare' },
  { icon: '/menu/users-group.svg', key: 'friends.all' },
  { icon: '/menu/user-plus.svg', key: 'friends.requests' },
  { icon: '/menu/ban.svg', key: 'friends.blocked' },
  { icon: '/menu/search-user.svg', key: 'friends.search' },
  { icon: '/menu/user-check.svg', key: 'friends.suggested' },
];

const INSIGHTS_RIGHT = [
  { icon: '/menu/stats.svg', key: 'insights.stats', href: '/travelstats' },
  { icon: '/menu/stats-summary.svg', key: 'insights.summary', href: '/insights' },
  { icon: '/menu/leaderboards.svg', key: 'insights.leaderboards', href: '' },
  { icon: '/menu/badge.svg', key: 'insights.badges', href: '' },
];

const GROUPS_RIGHT = [
  { icon: '/menu/folder-heart.svg', key: 'groups.popular' },
  { icon: '/menu/folder-bookmark.svg', key: 'groups.your' },
  { icon: '/menu/folder-plus.svg', key: 'groups.create' },
  { icon: '/menu/folder-two.svg', key: 'groups.manage' },
  { icon: '/menu/folder-check.svg', key: 'groups.suggested' },
];

const COMMUNITY_RIGHT = [
  { icon: '/menu/globe.svg', key: 'community.feed', href: '/feed' },
  { icon: '/menu/info-waves.svg', key: 'community.tips', href: '' },
  { icon: '/menu/rocket.svg', key: 'community.traveler', href: '' },
  { icon: '/menu/wheel.svg', key: 'community.guides', href: '' },
  { icon: '/menu/chart-no-axes-gantt.svg', key: 'community.polls', href: '' },
];

const SETTINGS_LINKS = [
  { icon: '/menu/cog-one.svg', key: 'settings.links.settings' },
  { icon: '/menu/user-waves.svg', key: 'settings.links.account' },
  { icon: '/menu/shield-crossed.svg', key: 'settings.links.privacy' },
  { icon: '/menu/notification.svg', key: 'settings.links.notifications' },
];

const HELP_RIGHT = [
  { icon: '/menu/at.svg', key: 'help.contacts' },
  { icon: '/menu/file-check.svg', key: 'help.report' },
  { icon: '/menu/question-diamond.svg', key: 'help.faq' },
  { icon: '/menu/chat-x.svg', key: 'help.forum' },
];

const CURRENCIES = ['curr.usd', 'curr.eur', 'curr.gbp', 'curr.cad'] as const;
const LANG_KEYS = ['lang.english', 'lang.ukrainian', 'lang.german', 'lang.russian'] as const;
const LOCALE_CODES = ['en', 'ua', 'de', 'ru'] as const;

export default function MegaMenu({ open, onClose }: Props) {
  const { t, locale, setLocale } = useI18n();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [activeKey, setActiveKey] = useState<string>('explore');
  const [mobileStage, setMobileStage] = useState<'list' | 'submenu'>('list');

  const [selectedCurrency, setSelectedCurrency] =
    useState<(typeof CURRENCIES)[number]>('curr.usd');

  const [selectedLangKey, setSelectedLangKey] = useState<(typeof LANG_KEYS)[number]>(() => {
    const idx = LOCALE_CODES.indexOf(locale as any);
    return LANG_KEYS[Math.max(0, idx)];
  });

  // close on outside / esc
  useEffect(() => {
    if (!open) return;

    const keyHandler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (document.querySelector('.hamburger-trigger')?.contains(target)) return;
      if (cardRef.current && !cardRef.current.contains(target)) onClose();
    };

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('mousedown', clickHandler);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setMobileStage('list');
  }, [open]);

  const handleFirstClick = (key: string) => {
    setActiveKey(key);
    if (window.matchMedia('(max-width: 800px)').matches) {
      setMobileStage('submenu');
    }
  };

  // sync language radio to app locale
  useEffect(() => {
    const map: Record<string, 'en' | 'ua' | 'de' | 'ru'> = {
      'lang.english': 'en',
      'lang.ukrainian': 'ua',
      'lang.german': 'de',
      'lang.russian': 'ru',
    };
    const next = map[selectedLangKey];
    if (next && next !== locale) setLocale(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLangKey]);

  const renderSettingsSection = () => (
    <div className='rounded-[24px] bg-white overflow-hidden max-w-[600px]'>
      <div className='flex flex-col gap-2 p-6'>
        <div className='text-[#475569] text-[16px] font-medium'>{t('settings.title')}</div>
        <div className='text-[#64748B] text-[12px] leading-5'>{t('settings.blurb')}</div>
      </div>

      <ul className='flex flex-col gap-4 px-6 py-4 border-y border-[#F1F5F9] bg-white'>
        {SETTINGS_LINKS.map((it) => (
          <li key={it.key} className='flex items-center gap-2 cursor-pointer'>
            <img src={it.icon} alt='' className='w-[22px] h-[22px]' />
            <span className='text-[#475569] text-[14px] leading-[22px]'>{t(it.key)}</span>
          </li>
        ))}
      </ul>

      <div className='grid grid-cols-2 gap-4 p-6 max-[991px]:grid-cols-1'>
        {/* Currency */}
        <div>
          <div className='text-[#475569] text-[14px] leading-[22px] mb-2'>
            {t('settings.currency')}
          </div>
          <div className='bg-white rounded-[12px] overflow-hidden flex flex-col gap-[1px]'>
            {CURRENCIES.map((cur) => (
              <label
                key={cur}
                className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer bg-[#F8FAFC] ${
                  selectedCurrency === cur ? 'bg-[#EFF6FF]' : ''
                }`}
              >
                <input
                  type='radio'
                  name='currency'
                  className='hidden'
                  checked={selectedCurrency === cur}
                  onChange={() => setSelectedCurrency(cur)}
                />
                <span className='text-slate-900 text-sm'>{t(cur)}</span>
                <span
                  className={`w-[18px] h-[18px] rounded-full bg-white shadow-[inset_0_0_0_2px_#e5e7eb] ${
                    selectedCurrency === cur ? 'shadow-[inset_0_0_0_5px_#002fff,0_0_0_4px_#e8efff]' : ''
                  }`}
                  aria-hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <div className='text-[#475569] text-[14px] leading-[22px] mb-2'>
            {t('settings.language')}
          </div>
          <div className='bg-white rounded-[12px] overflow-hidden flex flex-col gap-[1px]'>
            {LANG_KEYS.map((lngKey) => (
              <label
                key={lngKey}
                className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer bg-[#F8FAFC] ${
                  selectedLangKey === lngKey ? 'bg-[#EFF6FF]' : ''
                }`}
              >
                <input
                  type='radio'
                  name='language'
                  className='hidden'
                  checked={selectedLangKey === lngKey}
                  onChange={() => setSelectedLangKey(lngKey)}
                />
                <span className='text-slate-900 text-sm'>{t(lngKey)}</span>
                <span
                  className={`w-[18px] h-[18px] rounded-full bg-white shadow-[inset_0_0_0_2px_#e5e7eb] ${
                    selectedLangKey === lngKey ? 'shadow-[inset_0_0_0_5px_#002fff,0_0_0_4px_#e8efff]' : ''
                  }`}
                  aria-hidden
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRightFor = (key: string) => {
    switch (key) {
      case 'explore':
        return (
          <MegaMenuSection
            heroImage='/images/explore-hero.jpg'
            titleKey='explore.title'
            descKey='explore.description'
            items={EXPLORE_RIGHT}
            onClose={onClose}
          />
        );
      case 'map':
        return (
          <MegaMenuSection
            heroImage='/images/map-hero.jpg'
            titleKey='map.title'
            descKey='map.description'
            items={MAP_RIGHT}
            onClose={onClose}
            extraContent={
              <div className='flex flex-wrap gap-3 p-6'>
                <div className='flex gap-3'>
                  <img src='/images/villa1.jpg' alt='' className='w-[104px] h-16 rounded-[12px] object-cover' />
                  <div>
                    <div className='text-[#475569] text-[14px] font-medium'>Villa DE Marco</div>
                    <div className='text-[#64748B] text-[12px] leading-5'>Santorini, Greece</div>
                    <div className='text-[#1E293B] text-[14px] mt-1'>$180/night</div>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <img src='/images/villa2.jpg' alt='' className='w-[104px] h-16 rounded-[12px] object-cover' />
                  <div>
                    <div className='text-[#475569] text-[14px] font-medium'>Sunset Villa Oia</div>
                    <div className='text-[#64748B] text-[12px] leading-5'>Santorini, Greece</div>
                    <div className='text-[#1E293B] text-[14px] mt-1'>$250/night</div>
                  </div>
                </div>
              </div>
            }
          />
        );
      case 'trips':
        return (
          <MegaMenuSection
            heroImage='/images/trip-hero.jpg'
            titleKey='trips.title'
            descKey='trips.description'
            items={TRIPS_RIGHT}
            onClose={onClose}
          />
        );
      case 'albums':
        return (
          <MegaMenuSection
            heroImage='/images/albums-hero.jpg'
            titleKey='albums.title'
            descKey='albums.description'
            items={ALBUMS_RIGHT}
            onClose={onClose}
          />
        );
      case 'friends':
        return (
          <MegaMenuSection
            heroImage='/images/friends-hero.jpg'
            titleKey='friends.title'
            descKey='friends.description'
            items={FRIENDS_RIGHT}
            onClose={onClose}
          />
        );
      case 'insights':
        return (
          <MegaMenuSection
            heroImage='/images/insights-hero.jpg'
            titleKey='insights.title'
            descKey='insights.description'
            items={INSIGHTS_RIGHT}
            onClose={onClose}
          />
        );
      case 'groups':
        return (
          <MegaMenuSection
            heroImage='/images/groups-hero.jpg'
            titleKey='groups.title'
            descKey='groups.description'
            items={GROUPS_RIGHT}
            onClose={onClose}
          />
        );
      case 'community':
        return (
          <MegaMenuSection
            heroImage='/images/community-hero.jpg'
            titleKey='community.title'
            descKey='community.description'
            items={COMMUNITY_RIGHT}
            onClose={onClose}
          />
        );
      case 'help':
        return (
          <MegaMenuSection
            titleKey='help.title'
            descKey='help.description'
            items={HELP_RIGHT}
            onClose={onClose}
          />
        );
      case 'settings':
        return renderSettingsSection();
      default:
        return (
          <div className='grid place-items-center h-full rounded-[16px] bg-gradient-to-b from-[#f8fbff] to-[#f2f6ff] border border-dashed border-[rgba(2,52,255,.12)] p-6 text-center'>
            <div className='text-[#0f172a] font-bold mb-2'>{t(`menu.${key}`)}</div>
            <div className='text-slate-500 text-sm'>{t('common.comingSoon')}</div>
          </div>
        );
    }
  };

  const rightContent = renderRightFor(activeKey);

  return (
    <div
      className={`absolute inset-0 top-[78px] left-1/2 -translate-x-1/2 w-full z-[90] ${
        open ? 'block animate-[menuDrop_220ms_ease-out]' : 'hidden'
      } max-[640px]:top-[72px]`}
      aria-hidden={!open}
    >
      <div
        ref={cardRef}
        role='dialog'
        aria-modal='true'
        className='relative w-full bg-white rounded-b-[24px] shadow-[0_123px_120px_-61px_rgba(71,85,105,0.25)] overflow-hidden'
      >
        <div className='flex max-[800px]:h-[80vh] max-[800px]:relative'>
          {/* LEFT */}
          <aside
            className={`bg-[#fbfcff] p-6 max-w-[430px] box-border max-[800px]:absolute max-[800px]:inset-0 max-[800px]:transition-all max-[800px]:duration-200 ${
              mobileStage === 'submenu'
                ? 'max-[800px]:-translate-x-6 max-[800px]:opacity-0 max-[800px]:pointer-events-none'
                : 'max-[800px]:translate-x-0 max-[800px]:opacity-100'
            }`}
          >
            <ul className='flex flex-col gap-1 list-none m-0 p-0'>
              {FIRST_LEVEL.map((item) => (
                <React.Fragment key={item.key}>
                  <li
                    className={`flex items-start gap-3 px-2 py-2 rounded-[24px] cursor-pointer transition ${
                      activeKey === item.key ? 'bg-[#EFF6FF] relative' : 'hover:bg-[#EFF6FF]'
                    }`}
                    onClick={() => handleFirstClick(item.key)}
                  >
                    <div className='flex items-center gap-3'>
                      <img src={item.icon} alt='' className='w-[22px] h-[22px]' />
                      <span className='text-[#1E293B] text-[14px]'>{t(`menu.${item.key}`)}</span>
                    </div>
                    {activeKey === item.key && (
                      <span
                        className="hidden max-[800px]:hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[url('/menu/chevron-right.svg')] bg-no-repeat bg-center bg-cover"
                        aria-hidden
                      />
                    )}
                  </li>
                  {item.isDivider && <div className='w-full h-px bg-[#F1F5F9] my-2' />}
                </React.Fragment>
              ))}
            </ul>

            {/* AI promo */}
            <div className='flex items-center gap-3 mt-2 rounded-full bg-[linear-gradient(238deg,#F8FAFC_65.65%,#002FFF_438.7%)] p-2'>
              <div className='flex w-[37px] h-[37px] rounded-full bg-[linear-gradient(172deg,#FFF_59.56%,#3EC3FF_226.6%)] justify-center items-center shadow-[ -4px_5px_7px_-6px_#5774F5, -6px_-3px_8.9px_-7px_#3EC3FF, 6px_-3px_7.8px_-6px_#5774F5, 5px_6px_5.9px_-7px_#3EC3FF]'>
                <img src='/menu/infinity.svg' alt='' className='w-6 h-6' />
              </div>
              <div className='flex flex-col'>
                <div className='text-[#475569] text-[14px] font-medium'>{t('ai.title')}</div>
                <div className='text-[#64748B] text-[12px] leading-5 whitespace-nowrap max-[991px]:whitespace-normal max-[991px]:min-w-[250px]'>
                  {t('ai.description')}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <section
            className={`relative bg-[#EFF6FF] p-4 w-full box-border max-[800px]:absolute max-[800px]:inset-0 max-[800px]:transition-all max-[800px]:duration-200 ${
              mobileStage === 'submenu'
                ? 'max-[800px]:translate-x-0 max-[800px]:opacity-100'
                : 'max-[800px]:translate-x-6 max-[800px]:opacity-0 max-[800px]:pointer-events-none'
            }`}
          >
            {/* mobile top */}
            <div
              className='hidden max-[800px]:flex items-center gap-2 px-6 py-4 border-b border-[rgba(15,23,42,0.05)] bg-white cursor-pointer'
              onClick={() => setMobileStage('list')}
              role='button'
              aria-label={t('menu.back')}
            >
              <img src='/menu/chevron-left.svg' alt='' className='w-4 h-4' />
              <span className='text-[#1E293B] text-[14px] leading-[22px]'>
                {t(`menu.${activeKey}`)}
              </span>
            </div>

            {rightContent}
          </section>
        </div>
      </div>
    </div>
  );
}
