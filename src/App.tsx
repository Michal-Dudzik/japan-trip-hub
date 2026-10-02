import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, CheckCircle2, ChevronDown, ChevronUp, CloudRain, ExternalLink,
  Hotel, MapPin, Navigation, Plane, Printer, Route, Search, Sun, TicketCheck,
  TrainFront, Umbrella, WalletCards, Wifi, XCircle
} from 'lucide-react';
import { checklist, cityMeta, hotels, itinerary, reservations, transportNotes, type CityKey, type DayPlan, type Priority } from './data/trip';

const tripStart = new Date('2026-10-04T00:00:00+09:00');
const tripEnd = new Date('2026-10-22T23:59:59+09:00');

function mapUrl(query?: string) {
  if (!query) return '#';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function dateLabel(iso: string) {
  return new Intl.DateTimeFormat('pl-PL', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(new Date(`${iso}T12:00:00+09:00`));
}

function fullDate(iso: string) {
  return new Intl.DateTimeFormat('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00+09:00`));
}

function todayJapanIso() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function priorityClass(priority?: Priority) {
  if (priority === 'MUST') return 'priority must';
  if (priority === 'DROP FIRST') return 'priority drop';
  return 'priority optional';
}

function priorityLabel(priority?: Priority) {
  if (priority === 'MUST') return 'MUST';
  if (priority === 'DROP FIRST') return 'DROP FIRST';
  return 'OPTIONAL';
}

function WeatherBadge({ day }: { day: DayPlan }) {
  const [weather, setWeather] = useState<{ max: number; min: number; rain: number; code: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const meta = cityMeta[day.city];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${meta.lat}&longitude=${meta.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=16`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const i = data?.daily?.time?.indexOf(day.date);
        if (i >= 0) setWeather({
          max: Math.round(data.daily.temperature_2m_max[i]),
          min: Math.round(data.daily.temperature_2m_min[i]),
          rain: Math.round(data.daily.precipitation_probability_max[i] ?? 0),
          code: data.daily.weather_code[i] ?? 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [day.city, day.date]);

  if (loading) return <span className="weather muted">pogoda…</span>;
  if (!weather) return <span className="weather muted">prognoza niedostępna</span>;
  const rainy = weather.rain >= 45 || weather.code >= 51;
  return (
    <span className={`weather ${rainy ? 'rain' : ''}`} title="Prognoza Open-Meteo">
      {rainy ? <CloudRain size={15} /> : <Sun size={15} />}
      {weather.min}–{weather.max}°C · {weather.rain}%
    </span>
  );
}

function DayCard({ day, defaultOpen = false }: { day: DayPlan; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [note, setNote] = useState(() => localStorage.getItem(`note:${day.date}`) ?? '');
  const city = cityMeta[day.city].label;

  useEffect(() => {
    localStorage.setItem(`note:${day.date}`, note);
  }, [day.date, note]);

  return (
    <article className={`day-card ${open ? 'open' : ''}`}>
      {day.image && <div className="day-image" style={{ backgroundImage: `linear-gradient(180deg,rgba(5,12,20,.08),rgba(5,12,20,.68)),url("${day.image}")` }} />}
      <button className="day-head" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <div className="day-datebox">
          <strong>{dateLabel(day.date).split(',')[0]}</strong>
          <span>{day.date.slice(8, 10)}.{day.date.slice(5, 7)}</span>
        </div>
        <div className="day-title">
          <div className="eyebrow">{city}{day.overnight ? ` · nocleg: ${day.overnight}` : ''}</div>
          <h3>{day.title}</h3>
          <p>{day.summary}</p>
          <WeatherBadge day={day} />
        </div>
        <span className="chev">{open ? <ChevronUp /> : <ChevronDown />}</span>
      </button>

      {open && (
        <div className="day-body">
          <div className="timeline">
            {day.stops.map((stop, idx) => (
              <div className="stop" key={`${day.date}-${idx}`}>
                <div className="dot" />
                <div className="stop-time">{stop.time || '—'}</div>
                <div className="stop-main">
                  <div className="stop-title-row">
                    <strong>{stop.name}</strong>
                    <span className={priorityClass(stop.priority)}>{priorityLabel(stop.priority)}</span>
                  </div>
                  {stop.note && <p>{stop.note}</p>}
                  {stop.mapQuery && (
                    <a href={mapUrl(stop.mapQuery)} target="_blank" rel="noreferrer" className="map-link">
                      <MapPin size={14} /> Google Maps <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {(day.planB || day.notes) && (
            <div className="day-asides">
              {day.planB && <div className="aside rainbox"><Umbrella size={18} /><div><b>Plan B / pogoda</b><p>{day.planB}</p></div></div>}
              {day.notes?.map((n, i) => <div className="aside" key={i}><Navigation size={18} /><p>{n}</p></div>)}
            </div>
          )}

          <label className="notes-label">
            <span>Notatka na tym urządzeniu</span>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Np. zmiana godziny, numer peronu, pomysł na restaurację…" />
          </label>
        </div>
      )}
    </article>
  );
}

function Checklist() {
  const [done, setDone] = useState<Record<string, boolean>>(() => JSON.parse(localStorage.getItem('japan-checklist') || '{}'));
  useEffect(() => localStorage.setItem('japan-checklist', JSON.stringify(done)), [done]);

  const toggle = (key: string) => setDone(d => ({ ...d, [key]: !d[key] }));
  return (
    <div className="check-grid">
      {Object.entries(checklist).map(([section, items]) => (
        <section className="panel" key={section}>
          <h3>{section}</h3>
          <div className="checklist">
            {items.map(item => {
              const key = `${section}:${item}`;
              return <button key={key} className={`check-item ${done[key] ? 'done' : ''}`} onClick={() => toggle(key)}>
                {done[key] ? <CheckCircle2 size={20} /> : <span className="empty-check" />}<span>{item}</span>
              </button>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return status === 'confirmed'
    ? <span className="status ok"><CheckCircle2 size={14} /> potwierdzone</span>
    : <span className="status todo"><XCircle size={14} /> do zrobienia</span>;
}

function TripSummary() {
  const now = new Date();
  const diff = Math.ceil((tripStart.getTime() - now.getTime()) / 86400000);
  let headline = diff > 0 ? `${diff} dni do wyjazdu` : now <= tripEnd ? 'Wyjazd trwa' : 'Wyjazd zakończony';
  return (
    <div className="summary-cards">
      <div className="metric"><Plane /><div><b>{headline}</b><span>4–22 października 2026</span></div></div>
      <div className="metric"><CalendarDays /><div><b>18 dni</b><span>Tokio · Kioto · Osaka</span></div></div>
      <div className="metric"><Route /><div><b>5 osób</b><span>intensywne zwiedzanie</span></div></div>
      <div className="metric"><Wifi /><div><b>eSIM + offline</b><span>strona zapisuje się po pierwszym otwarciu</span></div></div>
    </div>
  );
}

function App() {
  const today = todayJapanIso();
  const todayPlan = itinerary.find(d => d.date === today) || (today < '2026-10-04' ? itinerary[0] : itinerary[itinerary.length - 1]);
  const [tab, setTab] = useState<'today' | 'plan' | 'bookings' | 'transport' | 'checklist'>('today');
  const [filter, setFilter] = useState<'all' | CityKey>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => itinerary.filter(day => {
    const cityOk = filter === 'all' || day.city === filter;
    const text = `${day.title} ${day.summary} ${day.stops.map(s => s.name).join(' ')}`.toLowerCase();
    return cityOk && text.includes(query.toLowerCase());
  }), [filter, query]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="kicker">JAPAN TRIP HUB · 2026</div>
          <h1>Japonia — plan 2.0</h1>
          <p>Wspólny, mobilny plan wyjazdu: atrakcje, pogoda, mapy, noclegi, rezerwacje i plan B.</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setTab('today')}><Navigation size={17}/> Dzisiaj</button>
            <button className="ghost" onClick={() => window.print()}><Printer size={17}/> Drukuj / PDF</button>
          </div>
          <TripSummary />
        </div>
      </header>

      <nav className="topnav">
        {[
          ['today', 'Dzisiaj'], ['plan', 'Cały plan'], ['bookings', 'Rezerwacje'], ['transport', 'Transport'], ['checklist', 'Checklist']
        ].map(([id, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id as typeof tab)}>{label}</button>)}
      </nav>

      <main>
        {tab === 'today' && (
          <section className="section-wrap">
            <div className="section-heading">
              <div><span className="eyebrow">Najbliższy / dzisiejszy etap</span><h2>{fullDate(todayPlan.date)}</h2></div>
              <a className="text-link" href={mapUrl(todayPlan.stops.find(s => s.mapQuery)?.mapQuery)} target="_blank" rel="noreferrer"><MapPin size={16}/> Otwórz pierwszy punkt</a>
            </div>
            <DayCard day={todayPlan} defaultOpen />
            <div className="quick-grid">
              <div className="panel highlight"><TicketCheck/><h3>Najbliższa twarda rezerwacja</h3><p>teamLab Borderless · 8.10 · 13:00</p></div>
              <div className="panel"><WalletCards/><h3>Płatności</h3><p>Gotówka JPY + Revolut + Visa + Mastercard. Przy terminalu wybieraj JPY.</p></div>
              <div className="panel"><Umbrella/><h3>Pogoda steruje planem</h3><p>10.10 Fuji jest najbardziej zależne od widoczności. Plan B jest przy każdym dniu.</p></div>
            </div>
          </section>
        )}

        {tab === 'plan' && (
          <section className="section-wrap">
            <div className="section-heading"><div><span className="eyebrow">4–22 października</span><h2>Cały plan</h2></div><p>Godziny są ramowe. MUST = priorytet, OPTIONAL = jeśli czas pozwoli.</p></div>
            <div className="filters">
              <div className="search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Szukaj miejsca…" /></div>
              <div className="filter-chips">
                {(['all','tokyo','fuji','kyoto','ohara','osaka'] as const).map(c => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c === 'all' ? 'Wszystko' : cityMeta[c].label}</button>)}
              </div>
            </div>
            <div className="days-list">{filtered.map(day => <DayCard key={day.date} day={day} defaultOpen={day.date === today}/>)}</div>
          </section>
        )}

        {tab === 'bookings' && (
          <section className="section-wrap">
            <div className="section-heading"><div><span className="eyebrow">Rezerwacje i noclegi</span><h2>Co jest potwierdzone, a co zostało</h2></div></div>
            <div className="book-grid">
              <div className="panel">
                <h3>Rezerwacje / bilety</h3>
                <div className="reservation-list">{reservations.map(r => <div className="reservation" key={r.title}><div><b>{r.title}</b><p>{r.detail}</p>{r.mapQuery && <a href={mapUrl(r.mapQuery)} target="_blank" rel="noreferrer"><MapPin size={14}/> mapa</a>}</div><StatusPill status={r.status}/></div>)}</div>
              </div>
              <div className="panel">
                <h3>Noclegi</h3>
                <div className="reservation-list">{hotels.map(h => <div className="reservation" key={h.title}><div><b>{h.dates} · {h.title}</b><p>{h.city}</p><div className="inline-links"><a href={mapUrl(h.mapQuery)} target="_blank" rel="noreferrer"><MapPin size={14}/> mapa</a><a href={h.booking} target="_blank" rel="noreferrer"><Hotel size={14}/> Booking</a></div></div></div>)}</div>
              </div>
            </div>
            <div className="panel info-panel"><h3>Przydatne linki</h3><div className="link-grid">
              <a href="https://www.vjw.digital.go.jp/" target="_blank" rel="noreferrer">Visit Japan Web <ExternalLink size={14}/></a>
              <a href="https://www.lufthansa.com/" target="_blank" rel="noreferrer">Lufthansa <ExternalLink size={14}/></a>
              <a href="https://www.google.com/maps" target="_blank" rel="noreferrer">Google Maps <ExternalLink size={14}/></a>
              <a href="https://www.wanderlog.com/" target="_blank" rel="noreferrer">Wanderlog <ExternalLink size={14}/></a>
            </div></div>
          </section>
        )}

        {tab === 'transport' && (
          <section className="section-wrap">
            <div className="section-heading"><div><span className="eyebrow">Pociągi + auta</span><h2>Transport i logistyka</h2></div></div>
            <div className="transport-grid">
              {transportNotes.map((item, i) => <article className="panel transport" key={item.title}>{i < 3 ? <TrainFront/> : <Route/>}<div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
            </div>
            <div className="panel warning"><h3>Duży bagaż w Shinkansenie</h3><p>Jeśli walizka ma sumę wymiarów powyżej 160 cm, potrzebna jest rezerwacja miejsca z przestrzenią na oversized baggage. Dla walizek 156–158 cm formalnie nie jest wymagana, ale przy pięciu dużych walizkach warto rozważyć miejsca z dodatkową przestrzenią dla wygody.</p></div>
          </section>
        )}

        {tab === 'checklist' && (
          <section className="section-wrap">
            <div className="section-heading"><div><span className="eyebrow">Przed wylotem</span><h2>Checklist</h2></div><p>Stan zapisuje się lokalnie na tym urządzeniu.</p></div>
            <Checklist />
          </section>
        )}
      </main>

      <footer>
        <div><b>Japonia 2026 — Trip Hub</b><span>Plan 2.0 · ostatnia aktualizacja: 02.10.2026</span></div>
        <p>Zdjęcia: Unsplash (Patrick Nguyen, Stefano Bucciarelli, Raphael Lopes, Laszlo Oveges, Atharva Sune, Charles Postiaux). Pogoda: Open-Meteo.</p>
      </footer>
    </div>
  );
}

export default App;
