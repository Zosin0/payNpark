# PayNPark

App de estacionamentos em React Native (Expo). Monorepo com npm workspaces.

Ver também: [fluxos de produto](docs/product-flows.md) e o [README do pacote host](packages/host/README.md).

## Estrutura

```
payNpark/
  apps/
    mobile/            # o app RN (@zosin0/paynpark-mobile)
  packages/
    host/               # projeto Android nativo + Expo config plugin, publicável no GitHub Packages
  .github/workflows/
    host-pipeline.yml   # CI/CD de packages/host: test -> build -> publish
```

Depende do backend em [`payNpark-backend`](https://github.com/Zosin0/payNpark-backend) (repositório separado) rodando em paralelo.

## Pré-requisitos

- Node.js 20+ e npm
- Um telefone com o app [Expo Go](https://expo.dev/go) instalado (mesma versão de SDK do projeto - ver `apps/mobile/package.json` → `"expo"`), **ou** Android Studio/Xcode para rodar num emulador/simulador
- Para builds Android nativos (`packages/host`): JDK 17 e Android SDK instalados, com `ANDROID_HOME` configurado

## Setup

```bash
git clone https://github.com/Zosin0/payNpark.git
cd payNpark
npm install

cp apps/mobile/.env.example apps/mobile/.env
# edite apps/mobile/.env:
#   EXPO_PUBLIC_API_URL -> URL do backend (ex: http://SEU_IP_NA_LAN:5000/api/v1
#     para testar num dispositivo físico; localhost só funciona em emulador)
#   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY -> chave do Google Maps JS API
```

O backend (`payNpark-backend`) precisa estar rodando e acessível na URL configurada em `EXPO_PUBLIC_API_URL` - veja o README daquele repositório para como subi-lo.

## Rodando o app

```bash
npm run mobile           # expo start (escaneie o QR code com o Expo Go)
npm run mobile:android   # expo run:android (build nativo local)
npm run mobile:ios       # expo run:ios (build nativo local, requer macOS)
```

Se o Expo Go do seu celular reclamar de incompatibilidade de SDK, é porque o Expo Go instalado é mais novo (ou mais velho) que a SDK do projeto - em dispositivo físico o Expo Go só suporta a versão mais recente da SDK, então o projeto precisa ser atualizado para acompanhar (`npx expo install expo@latest && npx expo install --fix`), não o contrário.

## `packages/host`

Projeto Android nativo do app, publicado como pacote npm (`@zosin0/paynpark-host`) no GitHub Packages, com pipeline própria de test/build/publish. Detalhes em [`packages/host/README.md`](packages/host/README.md).

```bash
# build Android nativo direto (o que a CI faz)
cd packages/host/android
./gradlew assembleRelease
```

## CI/CD

`.github/workflows/host-pipeline.yml` roda em `packages/host/**`, com três jobs encadeados via `needs`:

1. **test** - lint + testes unitários do pacote host
2. **build** - `./gradlew assembleRelease` (JDK 17), sobe o APK como artifact
3. **publish** - só em tag `host-v*` ou release, publica `@zosin0/paynpark-host` no GitHub Packages
