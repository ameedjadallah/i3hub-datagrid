import { useState, useEffect, useCallback } from "react";
import useAxios from "axios-hooks";

const useUsers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const [{ data, loading, error }, excuteGetUsers] = useAxios({
    url: `https://randomuser.me/api?results=${rowsPerPage}&page=${page}`,
    method: "GET",
  });

  const callExcuteGetUsers = useCallback(() => {
    return excuteGetUsers();
  }, [excuteGetUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    callExcuteGetUsers();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    callExcuteGetUsers();
  }, [callExcuteGetUsers]);

  return {
    data,
    loading,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    setRowsPerPage,
    page,
  };
};

export default useUsers;
