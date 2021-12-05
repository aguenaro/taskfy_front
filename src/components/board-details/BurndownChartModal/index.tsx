import { useEffect, useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { GraphPoint } from 'interfaces/GraphPoint';
import { IResponse } from 'interfaces/IResponse';
import { ModalProps } from 'interfaces/ModalProps';
import { useRouter } from 'next/router';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import api from 'services/api';

interface BurndownChartModalProps extends ModalProps {}

export const BurndownChartModal = ({
  isOpen,
  onClose,
}: BurndownChartModalProps) => {
  const router = useRouter();
  const { boardId } = router.query;
  const [graphPoints, setGraphPoints] = useState<GraphPoint[]>([]);

  useEffect(() => {
    const getGraph = async () => {
      const { data: response } = await api.get<IResponse<GraphPoint[]>>(
        `/boards/${boardId}/graph`
      );
      setGraphPoints(response.data);
    };

    if (boardId) getGraph();
  }, [boardId]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="blue"
      isCentered
      motionPreset="scale"
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white">Gráfico</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody mb={4}>
          <LineChart
            width={800}
            height={400}
            data={graphPoints}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(parseISO(date), 'dd/MM/yyyy')}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="situation" stroke="#8884d8" name="Situação" />
            <Line dataKey="recommended" stroke="#82ca9d" name="Recomendado" />
          </LineChart>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
