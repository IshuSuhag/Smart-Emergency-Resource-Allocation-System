
#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <algorithm>
#include <limits>
using namespace std;


struct Emergency {
    int id;
    string type;
    int location;
    int severity;
    int urgency;
    int waitingTime;
    double priority;
};

struct Resource {
    int id;
    string type;
    int location;
    bool available;
};

double calculatePriority(int s, int u, int w) {
    return (0.5 * s) + (0.3 * u) + (0.2 * w);
}


struct CompareEmergency {
    bool operator()(Emergency a, Emergency b) {
        return a.priority < b.priority;
    }
};


void registerEmergency(
    vector<Emergency>& emergencies,
    priority_queue<Emergency, vector<Emergency>, CompareEmergency>& pq
) {
    Emergency e;

    cout << "\nEnter Emergency ID: ";
    cin >> e.id;

    cout << "Emergency Type (Medical/Fire/Rescue): ";
    cin >> e.type;

    cout << "Enter Location (0-5): ";
    cin >> e.location;

    cout << "Enter Severity (1-10): ";
    cin >> e.severity;

    cout << "Enter Urgency (1-10): ";
    cin >> e.urgency;

    cout << "Enter Waiting Time Score (1-10): ";
    cin >> e.waitingTime;

    e.priority = calculatePriority(
        e.severity, e.urgency, e.waitingTime
    );

    emergencies.push_back(e);
    pq.push(e);

    cout << "\nEmergency Registered Successfully!";
    cout << "\nPriority Score: " << e.priority << endl;
}



int main() {

    vector<Emergency> emergencies;
    vector<Resource> resources;

    priority_queue<Emergency, vector<Emergency>, CompareEmergency> pq;

    int choice;

    do {
        cout << "\n\n========================================";
        cout << "\n SMART EMERGENCY RESOURCE ALLOCATION";
        cout << "\n========================================";
        cout << "\n1. Register Emergency";
        cout << "\n2. View Highest Priority Emergency";
        cout << "\n3. Exit";
        cout << "\nEnter Choice: ";

        cin >> choice;

        switch(choice) {

            case 1:
                registerEmergency(emergencies, pq);
                break;

            case 2:
                if(!pq.empty()) {
                    Emergency e = pq.top();

                    cout << "\nHighest Priority Emergency";
                    cout << "\nID: " << e.id;
                    cout << "\nType: " << e.type;
                    cout << "\nPriority: " << e.priority << endl;
                }
                else {
                    cout << "\nNo Emergencies Available!";
                }
                break;

            case 3:
                cout << "\nExiting Program...";
                break;

            default:
                cout << "\nInvalid Choice!";
        }

    } while(choice != 3);

    return 0;
}

