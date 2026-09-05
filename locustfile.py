from locust import HttpUser, task, between


class WellbeingUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def open_homepage(self):
        self.client.get("/")

    @task
    def open_dashboard(self):
        self.client.get("/student-dashboard")