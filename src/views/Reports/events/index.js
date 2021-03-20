import { useEffect, useState } from 'react';
import { requests } from 'helpers';
import { useToasts } from 'react-toast-notifications';
import Table from '../table';

const Events = () => {
  const { addToast } = useToasts();
  const [downloadTitle, setDownLoadTitle] = useState('Event Report');
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const selectHandler = async (e) => {
    const event = e.target.value;
    try {
      setLoading(true);
      const { data } = await requests.get(
        `/events/event-staff?eventId=${event}`
      );

      setStaff(
        data.map((e) => [e.fullName, e.designation, e.attendance_date, e.email])
      );
      setDownLoadTitle(
        events.filter((event) => event.value === e.target.value)[0].name
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      addToast('Failed to get staff', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await requests.get('/events?type=event');
        return setEvents(
          data.map((e) => ({
            name: e.title,
            value: e.id,
          }))
        );
      } catch (err) {
        addToast('Failed to get events', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    })();
  }, [addToast]);

  return (
    <Table
      dropDownValues={events}
      loading={loading}
      downloadTitle={downloadTitle}
      selectHandler={selectHandler}
      header={['Name', 'Desgination', ' Date', 'Download']}
      body={staff}
    />
  );
};

export default Events;
