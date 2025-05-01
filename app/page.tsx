import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <Card className="grid gap-5">
      <CardHeader>
        <CardTitle className="text-xl text-center">Hi there!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          The Air Quality Index (AQI) is an index to help us understand how
          healthy it is to be outside where you are. When outdoor air quality
          conditions are unhealthy, we can consider modifying activities,
          wearing a mask, or staying indoors to mitigate the negative effects of
          unhealthy air.
        </p>
        <p className="mt-5">
          AirNow has an excellent website and mobile app.{" "}
          <a
            className="underline"
            href="https://www.airnow.gov/"
            target="_blank"
          >
            Check out AirNow.gov.
          </a>
        </p>
        <p className="mt-5">
          Dowload the Environmental Protection Agency (EPA) AirNow mobile app,
          enter your locations, and turn on notification for forecasts.
        </p>
      </CardContent>
    </Card>
  );
}
