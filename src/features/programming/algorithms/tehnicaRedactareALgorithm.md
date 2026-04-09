1️⃣ Intuiția
2️⃣ Observarea
3️⃣ Gândirea algoritmică
4️⃣ Practica

1️⃣ Intuiția (foarte simplu)

Aici explici algoritmul fără programare.

Exemplu pentru Bubble Sort:

Imaginează-ți că ai niște bule într-un pahar cu apă.
Bulele mari se ridică încet spre suprafață.

Ideea:

elementele mari "urcă" la finalul array-ului

Asta e prima imagine mentală.

2️⃣ Observarea vizuală

Aici folosești visualizer-ul tău.

Userul vede:

34 12 55 21

și observă:

34 > 12 → swap

Dar nu îi spui codul.

Doar îl întrebi:

Ce observi?

Exercițiu:

Care dintre aceste două numere este mai mare?
[34] [12]

Userul răspunde:

34

Apoi:

Ce crezi că ar trebui să se întâmple?

3️⃣ Gândirea algoritmică

Acum introduci ideea de algoritm.

Explici pașii în limbaj simplu:

1. Parcurgem lista.
2. Comparăm două elemente vecine.
3. Dacă primul este mai mare, le schimbăm.
4. Repetăm până când lista este sortată.

Abia acum introduci pseudocode.

4️⃣ Codul

Acum apare codul:

for (let i = 0; i < n; i++) {
for (let j = 0; j < n - i - 1; j++) {
if (array[j] > array[j + 1]) {
swap(array[j], array[j + 1]);
}
}
}

Dar userul deja știe de ce există.
