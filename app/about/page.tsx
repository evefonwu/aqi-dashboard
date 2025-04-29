export default function Page() {
  return (
    <div className="grid gap-5">
      <h1 className="text-xl text-center">Hi there!</h1>
      <p>
        The Air Quality Index (AQI) is an index to help us understand how
        healthy it is to be outside where you are. When outdoor air quality
        conditions are unhealthy, we can consider modifying activities, wearing
        a mask, or staying indoors to mitigate the negative effects of unhealthy
        air.
      </p>
      <p>
        AirNow has an excellent website and mobile app.{" "}
        <a className="underline" href="https://www.airnow.gov/" target="_blank">
          Check out AirNow.gov.
        </a>
      </p>
      <p>
        Dowload the Environmental Protection Agency (EPA) AirNow mobile app,
        enter your locations, turn on notification for forecasts.
      </p>
    </div>
  );
}
