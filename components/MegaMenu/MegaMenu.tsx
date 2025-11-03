'use client';

import React, { useEffect, useRef, useState } from 'react';
import './MegaMenu.scss';
import { useI18n } from '@/components/Translation/TranslationProvider';
import Link from 'next/link';

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
  { key: 'help', icon: '/menu/help.svg', isDivider: false }
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
  { icon: '/menu/destinations.svg', key: 'explore.dreams', href: '' }
];

const MAP_RIGHT = [
  { icon: '/menu/search-user.svg', key: 'map.people' },
  { icon: '/menu/places.svg', key: 'map.places' },
  { icon: '/menu/stays.svg', key: 'map.stays' },
  { icon: '/menu/activities.svg', key: 'map.activities' },
  { icon: '/menu/food.svg', key: 'map.food' },
  { icon: '/menu/movies.svg', key: 'map.movies' },
  { icon: '/menu/tips.svg', key: 'map.tips' }
];

const TRIPS_RIGHT = [
  { icon: '/menu/plus.svg', key: 'trips.create' },
  { icon: '/menu/pin.svg', key: 'trips.mine' },
  { icon: '/menu/location-user.svg', key: 'trips.shared' },
  { icon: '/menu/location-check.svg', key: 'trips.suggested' },
  { icon: '/menu/sparkles.svg', key: 'trips.recommender' }
];

const ALBUMS_RIGHT = [
  { icon: '/menu/plus.svg', key: 'albums.create' },
  { icon: '/menu/book.svg', key: 'albums.mine' },
  { icon: '/menu/book-user.svg', key: 'albums.friends' },
  { icon: '/menu/book-share.svg', key: 'albums.shared' },
  { icon: '/menu/archive.svg', key: 'albums.archived' }
];

const FRIENDS_RIGHT = [
  { icon: '/menu/table.svg', key: 'friends.compare' },
  { icon: '/menu/users-group.svg', key: 'friends.all' },
  { icon: '/menu/user-plus.svg', key: 'friends.requests' },
  { icon: '/menu/ban.svg', key: 'friends.blocked' },
  { icon: '/menu/search-user.svg', key: 'friends.search' },
  { icon: '/menu/user-check.svg', key: 'friends.suggested' }
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
  { icon: '/menu/notification.svg', key: 'settings.links.notifications' }
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

  // preferences
  const [selectedCurrency, setSelectedCurrency] = useState<typeof CURRENCIES[number]>('curr.usd');
  const [selectedLangKey, setSelectedLangKey] = useState<typeof LANG_KEYS[number]>(() => {
    const idx = LOCALE_CODES.indexOf(locale as any);
    return LANG_KEYS[Math.max(0, idx)];
  });

  useEffect(() => {
    if (!open) {
			return;
		}

		const keyHandler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		const clickHandler = (e: MouseEvent) => {
			const target = e.target as Node;
			if (document.querySelector('.hamburger-trigger')?.contains(target)) {
				return;
			}
			if (cardRef.current && !cardRef.current.contains(target)) {
				onClose();
			}
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
    if (window.matchMedia('(max-width: 800px)').matches) setMobileStage('submenu');
  };

  // reflect language radio → app locale
  useEffect(() => {
    const map: Record<string, 'en' | 'ua' | 'de' | 'ru'> = {
      'lang.english': 'en',
      'lang.ukrainian': 'ua',
      'lang.german': 'de',
      'lang.russian': 'ru'
    };
    const next = map[selectedLangKey];
    if (next && next !== locale) setLocale(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLangKey]);

  const renderRightFor = (key: string) => {
    if (key === 'explore') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/explore-hero.jpg' alt='explore-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('explore.title')}</div>
              <div className='mega-hero-desc'>{t('explore.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {EXPLORE_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                {r.href && r.href.length && r.href.length > 0 ? (
                  <Link
                    className='mega-right-item-link'
                    href={r.href}
                    onClick={() => {onClose();}}
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
        </div>
      );
    }

    if (key === 'map') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/map-hero.jpg' alt='map-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('map.title')}</div>
              <div className='mega-hero-desc'>{t('map.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {MAP_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>

          <div className='mega-right-strip'>
            <div className='strip-card'>
              <img src='/images/villa1.jpg' alt='' />
              <div className='strip-meta'>
                <div className='strip-title'>Villa DE 'Marco</div>
                <div className='strip-sub'>Santorini, Greece</div>
                <div className='strip-price'>$180/night</div>
              </div>
            </div>
            <div className='strip-card'>
              <img src='/images/villa2.jpg' alt='' />
              <div className='strip-meta'>
                <div className='strip-title'>Sunset Villa Oia</div>
                <div className='strip-sub'>Santorini, Greece</div>
                <div className='strip-price'>$250/night</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (key === 'trips') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/trip-hero.jpg' alt='trip-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('trips.title')}</div>
              <div className='mega-hero-desc'>{t('trips.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {TRIPS_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (key === 'albums') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/albums-hero.jpg' alt='' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('albums.title')}</div>
              <div className='mega-hero-desc'>{t('albums.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {ALBUMS_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (key === 'friends') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/friends-hero.jpg' alt='friends-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('friends.title')}</div>
              <div className='mega-hero-desc'>{t('friends.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {FRIENDS_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (key === 'insights') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/insights-hero.jpg' alt='insights-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('insights.title')}</div>
              <div className='mega-hero-desc'>{t('insights.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {INSIGHTS_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                {r.href && r.href.length && r.href.length > 0 ? (
                  <Link
                    className='mega-right-item-link'
                    href={r.href}
                    onClick={() => {onClose();}}
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
        </div>
      );
    }

    if (key === 'groups') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/groups-hero.jpg' alt='groups-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('groups.title')}</div>
              <div className='mega-hero-desc'>{t('groups.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {GROUPS_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (key === 'community') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero'>
            <div className='mega-hero-img-wrapper'>
              <img className='mega-hero-img' src='/images/community-hero.jpg' alt='community-hero' />
            </div>
            <div className='mega-hero-text'>
              <div className='mega-hero-title'>{t('community.title')}</div>
              <div className='mega-hero-desc'>{t('community.description')}</div>
            </div>
          </div>

          <ul className='mega-right-list'>
            {COMMUNITY_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (key === 'settings') {
      return (
        <div className='mega-right-body'>
          <div className='mega-hero-no-image'>
            <div className='mega-hero-title'>{t('settings.title')}</div>
            <div className='mega-hero-desc'>{t('settings.blurb')}</div>
          </div>

          <ul className='mega-right-list'>
            {SETTINGS_LINKS.map((it) => (
              <li key={it.key} className='mega-right-item'>
                <img className='mega-right-icon' src={it.icon} alt='' />
                <span>{t(it.key)}</span>
              </li>
            ))}
          </ul>

          <div className='settings-grid'>
            <div className='pref-card'>
              <div className='pref-title'>{t('settings.currency')}</div>
              <div className='pref-box'>
                {CURRENCIES.map((cur) => (
                  <label key={cur} className={`pref-option ${selectedCurrency === cur ? 'active': ''}`}>
                    <input
                      type='radio'
                      name='currency'
                      value={cur}
                      checked={selectedCurrency === cur}
                      onChange={() => setSelectedCurrency(cur)}
                    />
                    <span className='pref-text'>{t(cur)}</span>
                    <span className='pref-radio' aria-hidden />
                  </label>
                ))}
              </div>
            </div>

            <div className='pref-card'>
              <div className='pref-title'>{t('settings.language')}</div>
              <div className='pref-box'>
                {LANG_KEYS.map((lngKey) => (
                  <label key={lngKey} className='pref-option'>
                    <input
                      type='radio'
                      name='language'
                      value={lngKey}
                      checked={selectedLangKey === lngKey}
                      onChange={() => setSelectedLangKey(lngKey)}
                    />
                    <span className='pref-text'>{t(lngKey)}</span>
                    <span className='pref-radio' aria-hidden />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (key === 'help') {
      return (
        <div className='mega-right-body'>


          <ul className='mega-right-list'>
            {HELP_RIGHT.map((r) => (
              <li key={r.key} className='mega-right-item'>
                <img className='mega-right-icon' src={r.icon} alt='' />
                <span>{t(r.key)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className='mega-right-placeholder'>
        <div className='placeholder-title'>
          {/* Fallback: try menu label key by active key */}
          {t(`menu.${key}`)}
        </div>
        <div className='placeholder-sub'>{t('common.comingSoon')}</div>
      </div>
    );
  };

  const rightContent = renderRightFor(activeKey);

  return (
    <div className={`mega-overlay ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div ref={cardRef} className='mega-card' role='dialog' aria-modal='true'>
        <div className='mega-inner'>
          <aside className={`mega-left ${mobileStage === 'submenu' ? 'slide-out' : 'slide-in'}`}>
            <ul className='mega-left-list'>
              {FIRST_LEVEL.map((item) => (
								<>
                <li
                  key={item.key}
                  className={`mega-left-item ${activeKey === item.key ? 'active' : ''}`}
                  onClick={() => handleFirstClick(item.key)}
                >
                  <div className='mega-left-main'>
                    <img className='mega-left-icon' src={item.icon} alt='' />
                    <span>{t(`menu.${item.key}`)}</span>
                  </div>
                </li>

								{item.isDivider && (<div className='mega-left-divider'></div>)}
								</>
              ))}
            </ul>

            <div className='mega-ai'>
              <div className='mega-ai-icon'>
                <img src='/menu/infinity.svg' alt='' />
              </div>
              <div className='mega-ai-text'>
                <div className='mega-ai-title'>{t('ai.title')}</div>
                <div className='mega-ai-sub'>{t('ai.description')}</div>
              </div>
            </div>
          </aside>

          <section className={`mega-right ${mobileStage === 'submenu' ? 'slide-in' : 'slide-out'}`}>
            <div
              className='mega-mobile-top'
              onClick={() => setMobileStage('list')}
              role='button'
              aria-label={t('menu.back')}
            >
              <img className='mega-back-icon' src='/menu/chevron-left.svg' alt='' />
              <span className='mega-mobile-title'>
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
