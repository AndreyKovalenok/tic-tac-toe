# tic-tac-toe

При первом заупске игры выобр игрока происзводится случайным образом. 

После каждой игры меняется статистика игры (расположена над игровым полем), фигуры игроков, то есть если за крестики играл игрок, то в следующем раунде
за крестики будет играть компьютер. Для запуска следующего раунда необходимо нажать на кнопку "Начать заново". После каждого завершенного раунда записывается информация
о серии игр, чтобы посмотреть ее необходимо кликнуть по кнопке "История игр".

Логика компьюетра строится следуюим образом: перед каждым ходом компьютер анализирует сначала выигрышные клетки по горизонтали, вертикали и диагонали для себя, если таких нет, то он ищет такие клетки для игрока, если и таковых нет, то выбирается случайныя клетка из свободных клеток на поле (случайный выбор сделан для достажения баланса, если добавить приоретит клеткам то выиграть у компьютера будет слишком сложно). После каждого хода игрока и компьютера происходит проверка на завершение игры. 
