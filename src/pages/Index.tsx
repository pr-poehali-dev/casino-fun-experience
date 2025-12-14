import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [balance, setBalance] = useState(10000);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);
  const [isBetting, setIsBetting] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [isSpinning, setIsSpinning] = useState(false);

  const games = [
    {
      id: 1,
      name: 'Mega Fortune',
      category: 'Слоты',
      image: 'https://cdn.poehali.dev/projects/c5fdf025-49d0-4225-91c1-9ec1e308cea6/files/2388b148-d154-4465-95a7-0ad1368bbf2c.jpg',
      jackpot: '₽2,450,000',
      players: 1247
    },
    {
      id: 2,
      name: 'Royal Roulette',
      category: 'Рулетка',
      image: 'https://cdn.poehali.dev/projects/c5fdf025-49d0-4225-91c1-9ec1e308cea6/files/e1897585-53a3-46b3-b90b-0ea45b66b38c.jpg',
      players: 856
    },
    {
      id: 3,
      name: 'Texas Holdem',
      category: 'Покер',
      image: 'https://cdn.poehali.dev/projects/c5fdf025-49d0-4225-91c1-9ec1e308cea6/files/d8fd1d7a-1daa-4af8-a43c-131506e3f463.jpg',
      players: 623
    }
  ];

  const tournaments = [
    {
      id: 1,
      name: 'Турнир выходного дня',
      prize: '₽500,000',
      players: 245,
      maxPlayers: 500,
      status: 'active'
    },
    {
      id: 2,
      name: 'Mega Slots Challenge',
      prize: '₽1,000,000',
      players: 489,
      maxPlayers: 1000,
      status: 'active'
    },
    {
      id: 3,
      name: 'VIP Championship',
      prize: '₽2,500,000',
      players: 78,
      maxPlayers: 100,
      status: 'soon'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'CryptoKing777', wins: 145000, avatar: '👑' },
    { rank: 2, name: 'LuckyDiamond', wins: 128500, avatar: '💎' },
    { rank: 3, name: 'SlotMaster', wins: 112300, avatar: '🎰' },
    { rank: 4, name: 'VegasPro', wins: 98700, avatar: '🌟' },
    { rank: 5, name: 'RoyalFlush', wins: 87400, avatar: '🃏' }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Приветственный бонус',
      description: '+200% к первому депозиту до ₽50,000',
      type: 'hot'
    },
    {
      id: 2,
      title: 'Кэшбэк 15%',
      description: 'Возврат проигрышей каждую неделю',
      type: 'new'
    },
    {
      id: 3,
      title: 'Фриспины',
      description: '100 бесплатных вращений на новые слоты',
      type: 'hot'
    }
  ];

  const paymentMethods = [
    { name: 'Visa/MasterCard', icon: 'CreditCard', time: '5 минут' },
    { name: 'Криптовалюта', icon: 'Bitcoin', time: '10 минут' },
    { name: 'Электронные кошельки', icon: 'Wallet', time: '1 минута' },
    { name: 'Банковский перевод', icon: 'Building', time: '1-3 дня' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b border-primary/20 neon-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎰</div>
              <h1 className="text-2xl font-bold text-primary neon-text">NEON CASINO</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {['Главная', 'Игры', 'Турниры', 'Промоакции', 'Лидерборд'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary neon-text' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              {isLoggedIn && (
                <div className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-card border border-secondary/50 gold-glow">
                  <Icon name="Wallet" size={18} className="text-secondary" />
                  <span className="font-bold text-secondary text-sm md:text-base">{balance.toLocaleString()} ₽</span>
                </div>
              )}
              
              {isLoggedIn ? (
                <Button size="sm" className="neon-glow hidden sm:flex">
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="border-primary text-primary">
                        Вход
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">Вход в аккаунт</DialogTitle>
                        <DialogDescription>Войдите чтобы начать играть и выигрывать</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input id="login-email" type="email" placeholder="your@email.com" className="bg-background" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Input id="login-password" type="password" placeholder="••••••••" className="bg-background" />
                        </div>
                        <Button className="w-full neon-glow" onClick={() => { setIsLoggedIn(true); setIsLoginOpen(false); }}>
                          <Icon name="LogIn" size={18} className="mr-2" />
                          Войти
                        </Button>
                        <div className="text-center text-sm">
                          <span className="text-muted-foreground">Нет аккаунта? </span>
                          <button 
                            className="text-primary font-medium hover:underline"
                            onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
                          >
                            Зарегистрироваться
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="neon-glow">
                        Регистрация
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card border-primary/30">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">Регистрация</DialogTitle>
                        <DialogDescription>Создайте аккаунт и получите приветственный бонус +200%</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Имя</Label>
                          <Input id="register-name" placeholder="Ваше имя" className="bg-background" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input id="register-email" type="email" placeholder="your@email.com" className="bg-background" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <Input id="register-password" type="password" placeholder="••••••••" className="bg-background" />
                        </div>
                        <Button className="w-full neon-glow" onClick={() => { setIsLoggedIn(true); setIsRegisterOpen(false); }}>
                          <Icon name="UserPlus" size={18} className="mr-2" />
                          Создать аккаунт
                        </Button>
                        <div className="text-center text-sm">
                          <span className="text-muted-foreground">Уже есть аккаунт? </span>
                          <button 
                            className="text-primary font-medium hover:underline"
                            onClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
                          >
                            Войти
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline" className="md:hidden border-primary">
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-card border-primary/30 w-[300px]">
                  <div className="flex flex-col gap-6 mt-8">
                    {isLoggedIn && (
                      <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background border border-secondary/50 gold-glow">
                        <Icon name="Wallet" size={20} className="text-secondary" />
                        <span className="font-bold text-secondary">{balance.toLocaleString()} ₽</span>
                      </div>
                    )}
                    
                    <nav className="flex flex-col gap-3">
                      {['Главная', 'Игры', 'Турниры', 'Промоакции', 'Лидерборд'].map((item) => (
                        <button
                          key={item}
                          onClick={() => { setActiveSection(item.toLowerCase()); setIsMobileMenuOpen(false); }}
                          className={`text-left px-4 py-3 rounded-lg font-medium transition-all ${
                            activeSection === item.toLowerCase() 
                              ? 'bg-primary/20 text-primary border border-primary/50' 
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </nav>
                    
                    {!isLoggedIn ? (
                      <div className="flex flex-col gap-3 pt-4 border-t border-primary/20">
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                        >
                          Вход
                        </Button>
                        <Button 
                          className="w-full neon-glow"
                          onClick={() => { setIsMobileMenuOpen(false); setIsRegisterOpen(true); }}
                        >
                          Регистрация
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full neon-glow" onClick={() => setIsMobileMenuOpen(false)}>
                        <Icon name="User" size={18} className="mr-2" />
                        Профиль
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'главная' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl gradient-bg p-6 md:p-12 text-center neon-border">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 neon-text">Добро пожаловать в будущее азарта</h2>
                <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8">Современное казино с неоновым дизайном и огромными выигрышами</p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 neon-glow animate-glow-pulse w-full sm:w-auto">
                    <Icon name="Play" size={24} className="mr-2" />
                    Начать играть
                  </Button>
                  <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-secondary text-secondary hover:bg-secondary/10 w-full sm:w-auto">
                    <Icon name="Gift" size={24} className="mr-2" />
                    Бонусы
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 md:flex md:gap-8 justify-center mt-6 md:mt-8">
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-secondary">₽150M+</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Выплачено игрокам</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-primary">12,547</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Активных игроков</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-accent">24/7</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Поддержка</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-bold">🔥 Популярные игры</h3>
                <Button variant="ghost" className="text-primary">
                  Все игры
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {games.map((game) => (
                  <Card 
                    key={game.id} 
                    className="group overflow-hidden bg-card border-primary/20 hover:border-primary/60 transition-all cursor-pointer hover:scale-105 duration-300"
                    onMouseEnter={() => setHoveredGame(game.id)}
                    onMouseLeave={() => setHoveredGame(null)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.name} 
                        className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
                          hoveredGame === game.id && game.category === 'Слоты' ? 'slot-spin' : ''
                        }`}
                      />
                      <Badge className="absolute top-3 right-3 bg-primary/90 text-white">{game.category}</Badge>
                      {game.jackpot && (
                        <div className="absolute bottom-3 left-3 bg-secondary/90 text-dark-bg px-3 py-1 rounded-lg font-bold animate-pulse">
                          💰 {game.jackpot}
                        </div>
                      )}
                      {hoveredGame === game.id && game.category === 'Слоты' && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                          <div className="text-4xl font-bold text-white animate-bounce">🎰</div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-lg mb-2">{game.name}</h4>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Users" size={16} />
                          <span>{game.players} игроков</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="neon-glow"
                          onClick={() => { setSelectedGame(game); setIsBetting(true); }}
                        >
                          Играть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">🎁 Промоакции</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {promotions.map((promo) => (
                  <Card key={promo.id} className="bg-card border-secondary/30 hover:border-secondary transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-lg">{promo.title}</h4>
                        <Badge variant={promo.type === 'hot' ? 'destructive' : 'default'} className="animate-glow-pulse">
                          {promo.type === 'hot' ? '🔥 ХИТ' : '✨ НОВОЕ'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{promo.description}</p>
                      <Button className="w-full" variant="outline">Получить</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'игры' && (
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Каталог игр</h2>
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-card border border-primary/20">
                <TabsTrigger value="all">Все игры</TabsTrigger>
                <TabsTrigger value="slots">Слоты</TabsTrigger>
                <TabsTrigger value="roulette">Рулетка</TabsTrigger>
                <TabsTrigger value="poker">Покер</TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...games, ...games, ...games].map((game, idx) => (
                  <Card 
                    key={idx} 
                    className="group overflow-hidden bg-card border-primary/20 hover:border-primary/60 transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredGame(game.id + idx * 100)}
                    onMouseLeave={() => setHoveredGame(null)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.name} 
                        className={`w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500 ${
                          hoveredGame === (game.id + idx * 100) && game.category === 'Слоты' ? 'slot-spin' : ''
                        }`}
                      />
                      {hoveredGame === (game.id + idx * 100) && game.category === 'Слоты' && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                          <div className="text-3xl font-bold text-white animate-bounce">🎰</div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold mb-2">{game.name}</h4>
                      <Button 
                        size="sm" 
                        className="w-full neon-glow"
                        onClick={() => { setSelectedGame(game); setIsBetting(true); }}
                      >
                        Играть
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'турниры' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">Турниры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tournaments.map((tournament) => (
                <Card key={tournament.id} className="bg-card border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Trophy" size={16} className="text-secondary" />
                            <span className="text-secondary font-bold">{tournament.prize}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            <span>{tournament.players}/{tournament.maxPlayers}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={tournament.status === 'active' ? 'bg-primary' : 'bg-muted'}>
                        {tournament.status === 'active' ? '🟢 Активен' : '🕐 Скоро'}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(tournament.players / tournament.maxPlayers) * 100}%` }}
                      />
                    </div>
                    <Button className="w-full neon-glow" disabled={tournament.status !== 'active'}>
                      {tournament.status === 'active' ? 'Участвовать' : 'Ожидание'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'промоакции' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">Акции и бонусы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...promotions, ...promotions].map((promo, idx) => (
                <Card key={idx} className="bg-card border-secondary/30 hover:border-secondary transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold">{promo.title}</h3>
                      <Badge variant={promo.type === 'hot' ? 'destructive' : 'default'} className="animate-glow-pulse">
                        {promo.type === 'hot' ? '🔥 ХИТ' : '✨ НОВОЕ'}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">{promo.description}</p>
                    <Button className="w-full text-lg py-6" size="lg">Активировать бонус</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'лидерборд' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-bold">🏆 Топ игроков</h2>
              <Button variant="outline">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Обновить
              </Button>
            </div>
            <Card className="bg-card border-primary/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl font-bold ${
                          player.rank === 1 ? 'text-secondary' : 
                          player.rank === 2 ? 'text-muted-foreground' : 
                          player.rank === 3 ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          #{player.rank}
                        </div>
                        <div className="text-4xl">{player.avatar}</div>
                        <div>
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-muted-foreground">Выигрыш: ₽{player.wins.toLocaleString()}</div>
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <Badge className="bg-primary">
                          <Icon name="Trophy" size={16} className="mr-1" />
                          Победитель
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Dialog open={isBetting} onOpenChange={setIsBetting}>
        <DialogContent className="sm:max-w-lg bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">{selectedGame?.category === 'Слоты' ? '🎰' : selectedGame?.category === 'Рулетка' ? '🎡' : '🃏'}</span>
              {selectedGame?.name}
            </DialogTitle>
            <DialogDescription>Сделайте ставку и испытайте удачу!</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-primary/30 p-6 gradient-bg">
              {isSpinning && selectedGame?.category === 'Слоты' ? (
                <div className="flex justify-center items-center gap-4 h-32">
                  <div className="text-6xl animate-spin">🎰</div>
                  <div className="text-6xl animate-spin" style={{ animationDelay: '0.2s' }}>💎</div>
                  <div className="text-6xl animate-spin" style={{ animationDelay: '0.4s' }}>🍒</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-4">
                    {selectedGame?.category === 'Слоты' ? '🎰 💎 🍒' : 
                     selectedGame?.category === 'Рулетка' ? '🎡' : '🃏 🃏'}
                  </div>
                  {selectedGame?.jackpot && (
                    <div className="text-secondary font-bold text-2xl animate-pulse">
                      Джекпот: {selectedGame.jackpot}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">Размер ставки</Label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBetAmount(Math.max(10, betAmount - 50))}
                  disabled={isSpinning}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <Input 
                  type="number" 
                  value={betAmount} 
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="text-center text-xl font-bold bg-background"
                  disabled={isSpinning}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBetAmount(Math.min(balance, betAmount + 50))}
                  disabled={isSpinning}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <div className="flex gap-2">
                {[100, 500, 1000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setBetAmount(amount)}
                    disabled={isSpinning}
                  >
                    ₽{amount}
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ваш баланс:</span>
                <span className="font-bold text-secondary">₽{balance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ставка:</span>
                <span className="font-bold">₽{betAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Баланс после:</span>
                <span className="font-bold">₽{(balance - betAmount).toLocaleString()}</span>
              </div>
            </div>

            <Button 
              className="w-full text-lg py-6 neon-glow" 
              size="lg"
              disabled={betAmount > balance || isSpinning}
              onClick={() => {
                setIsSpinning(true);
                setBalance(balance - betAmount);
                setTimeout(() => {
                  const win = Math.random() > 0.5;
                  const winAmount = win ? betAmount * (Math.random() * 3 + 1) : 0;
                  setBalance(prev => prev + Math.floor(winAmount));
                  setIsSpinning(false);
                }, 2000);
              }}
            >
              {isSpinning ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Вращение...
                </>
              ) : (
                <>
                  <Icon name="Play" size={20} className="mr-2" />
                  Сделать ставку ₽{betAmount}
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section className="bg-card border-t border-primary/20 py-12 mt-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">💳 Способы пополнения и вывода</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {paymentMethods.map((method, idx) => (
              <Card key={idx} className="bg-background border-primary/20 hover:border-primary/60 transition-all cursor-pointer text-center">
                <CardContent className="p-6">
                  <Icon name={method.icon} size={48} className="mx-auto mb-4 text-primary" />
                  <h4 className="font-bold mb-2">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">{method.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="neon-glow">
              <Icon name="Plus" size={20} className="mr-2" />
              Пополнить счет
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-primary/20 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-primary">NEON CASINO</h4>
              <p className="text-sm text-muted-foreground">Современное онлайн казино с лучшими играми и щедрыми бонусами</p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Игры</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Слоты</li>
                <li>Рулетка</li>
                <li>Покер</li>
                <li>Live Casino</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Лицензия</li>
                <li>Правила</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">Поддержка 24/7</h5>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Онлайн чат
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary/20 mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2024 NEON CASINO. Все права защищены. Играйте ответственно 18+
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;